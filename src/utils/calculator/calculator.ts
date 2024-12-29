import { AST } from '../ast/ast.parser.ts';
import { ELStep, ELTask, WebApiTask } from './calculator.types.ts';
import { astTraverse } from '../ast/ast.traverse.ts';
import {
	EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD,
	LAST_RENDER_INITIAL_TIME,
} from './calculator.constants.ts';
import { Node } from 'acorn';
import { isSetTimeoutExpression } from '../ast/ast.utils.ts';
import {
	isArrowFunctionExpression,
	isCallExpression,
} from '../ast/ast.guards.ts';
import { ScopeManager } from 'eslint-scope';
import { Queue } from '../../types.ts';

const { macrotask: macrotaskStops, microtasks: microtasksStops } =
	EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD;

export class Calculator {
	constructor(scope: ScopeManager) {
		this.scope = scope;
	}

	private scope: ScopeManager;
	private macrotasks: Node[] = [];
	private microtasks: Node[] = [];
	private rafCallbacks: Node[] = [];
	private callstack: Node[] = [];
	private webApi: WebApiTask[] = [];
	private console: Node[] = [];

	private steps: ELStep[] = [];

	private lastRender = LAST_RENDER_INITIAL_TIME;
	private time = 0;

	private log(step: ELStep) {
		this.steps.push(step);
	}

	get isFinished() {
		return (
			this.macrotasks.length +
				this.microtasks.length +
				this.rafCallbacks.length +
				this.callstack.length +
				this.webApi.length ===
				0 && this.lastRender !== LAST_RENDER_INITIAL_TIME
		);
	}

	private timeToNextStop(arr: number[]) {
		const grad = this.time % 360;
		return (arr.find((item) => grad < item) ?? Infinity) - grad;
	}

	private processNextTask() {
		const now = this.time;
		const hasMacrotasks = this.macrotasks.length > 0;
		const hasMicrotasks = this.microtasks.length > 0;
		const hasWebApi = this.webApi.length > 0;

		const potentialTasks: { key: ELTask; time: number }[] = [
			{
				key: 'macrotask',
				time: hasMacrotasks
					? now + this.timeToNextStop(macrotaskStops)
					: Infinity,
			},
			{
				key: 'microtask',
				time: hasMicrotasks
					? now + this.timeToNextStop(microtasksStops)
					: Infinity,
			},
			{
				key: 'scheduleRender',
				// schedule 90 grad before render
				time:
					this.lastRender + 720 - 90 === this.time
						? this.time + 720
						: this.lastRender + 720 - 90,
			},
			{
				key: 'render',
				// render only for even loop pass (simulation purposes)
				time:
					this.lastRender + 720 === this.time
						? this.time + 720
						: this.lastRender + 720,
			},
			{
				key: 'webApiResolve',
				time: hasWebApi ? this.webApi[0].endTime : Infinity,
			},
		];

		const nextTask = potentialTasks.toSorted((a, b) => a.time - b.time)[0];
		this.time = nextTask.time;

		const process: Record<ELTask, (time: number) => void> = {
			macrotask: (time) => {
				const task = this.macrotasks.shift();
				if (!task) throw new Error('No macrotask found');
				this.log({ time, type: 'shift', queue: 'macrotask', ast: task });
				this.executeCode(task);
				if (!this.macrotasks.length) {
					this.log({ time, type: 'markStop', stop: 'macrotask', value: false });
				}
			},
			microtask: (time) => {
				while (this.microtasks.length > 0) {
					const task = this.microtasks.shift();
					if (!task) throw new Error('No microtask found');
					this.log({ time, type: 'shift', queue: 'microtask', ast: task });
					this.executeCode(task);
				}
				this.log({ time, type: 'markStop', stop: 'microtask', value: false });
			},
			scheduleRender: (time) => {
				this.log({ time, type: 'markStop', stop: 'render', value: true });
			},
			render: (time) => {
				this.lastRender = time;
				this.log({ time, type: 'render' });
				const count = this.rafCallbacks.length;
				// exclude inner callbacks execution in the same step
				for (let i = 0; i < count; i++) {
					const task = this.rafCallbacks.shift();
					if (!task) throw new Error('No raf callback found');
					this.log({ time, type: 'shift', queue: 'rafCallback', ast: task });
					this.executeCode(task);
				}
				this.log({ time, type: 'markStop', stop: 'render', value: false });
			},
			webApiResolve: (time) => {
				const webApiTask = this.webApi.shift();
				if (!webApiTask) throw new Error('No webApi task found');
				const { node } = webApiTask;
				if (
					!isCallExpression(node) ||
					!isSetTimeoutExpression(node) ||
					!isArrowFunctionExpression(node.arguments[0])
				) {
					// only simple setTimeout is supported at the moment
					throw new Error('Unsupported webApi task');
				}
				const ast = node.arguments[0].body;
				this.log({
					time,
					type: 'delete',
					queue: 'webApi',
					ast: node.arguments[0],
				});
				this.addToQueue({ type: 'macrotask', ast, time });
			},
		};

		process[nextTask.key](nextTask.time);
	}

	private addToQueue({
		type,
		ast,
		time = this.time,
	}: {
		type: Queue;
		ast: Node;
		time?: number;
	}) {
		const queue = {
			macrotask: this.macrotasks,
			microtask: this.microtasks,
			rafCallback: this.rafCallbacks,
			callstack: this.callstack,
			console: this.console,
		}[type];
		queue.push(ast);

		if (['macrotask', 'microtask'].includes(type)) {
			this.log({
				time,
				type: 'markStop',
				stop: type as 'macrotask' | 'microtask',
				value: true,
			});
		}

		this.log({
			time,
			type: 'push',
			queue: type,
			ast,
		});
	}

	private executeCode(ast: Node) {
		const logger = this.log.bind(this);
		const addToQueue = this.addToQueue.bind(this);
		astTraverse({
			ast,
			logger,
			addToQueue,
			time: this.time,
			webApi: this.webApi,
			scope: this.scope,
		});
	}

	// calculate EL steps based on AST
	public calculate(ast: AST) {
		this.log({
			time: this.time,
			type: 'start',
			ast,
		});

		this.addToQueue({
			type: 'macrotask',
			ast,
		});

		while (!this.isFinished) {
			this.processNextTask();
		}

		this.log({
			time: Math.ceil(this.time / 360) * 360,
			type: 'end',
		});

		return this.steps;
	}
}
