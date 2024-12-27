import { AST } from '../ast/ast.parser.ts';
import { ELStep, ELTask, Queue, WebApiTask } from './calculator.types.ts';
import { astTraverse } from '../ast/ast.traverse.ts';
import {
	EVENT_LOOP_FULL_CIRCLE,
	EVENT_LOOP_WHEEL_STOPS,
	EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD,
} from './calculator.constants.ts';
import { Node } from 'acorn';
import { isSetTimeoutExpression } from '../ast/ast.utils.ts';
import { isArrowFunctionExpression, isCallExpression } from '../ast/ast.guards.ts';
import { ScopeManager } from 'eslint-scope';

const {
	macrotask: macrotaskStops,
	render: renderStops,
	microtasks: microtasksStops,
	scheduleRender: scheduleRenderStops,
} = EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD;

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

	private lastRender = EVENT_LOOP_WHEEL_STOPS.render;
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
				0 && this.lastRender !== EVENT_LOOP_WHEEL_STOPS.render
		);
	}

	private timeToNextStop(arr: number[]) {
		const grad = this.time % EVENT_LOOP_FULL_CIRCLE;
		return (arr.find(item => grad < item) ?? Infinity) - grad;
	}

	private processNextTask() {
		const now = this.time;
		const hasMacrotasks = this.macrotasks.length > 0;
		const hasMicrotasks = this.microtasks.length > 0;
		const hasWebApi = this.webApi.length > 0;
		// render is triggered only every second loop for simulation purposes
		const hasRender = (Math.floor(this.time / 360) + 1) % 2;

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
				time: now + this.timeToNextStop(scheduleRenderStops) + 360 * hasRender,
			},
			{
				key: 'render',
				time: now + this.timeToNextStop(renderStops) + 360 * hasRender,
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
				this.log({ time, type: 'event', section: 'macrotask' });
				const task = this.macrotasks.shift();
				if (!task) throw new Error('No macrotask found');
				this.log({ time, type: 'shift', queue: 'macrotask', ast: task });
				this.executeCode(task);
			},
			microtask: (time) => {
				this.log({ time, type: 'event', section: 'microtask' });
				while (this.microtasks.length > 0) {
					const task = this.microtasks.shift();
					if (!task) throw new Error('No microtask found');
					this.log({ time, type: 'shift', queue: 'microtask', ast: task });
					this.executeCode(task);
				}
			},
			scheduleRender: (time) => {
				this.log({ time, type: 'schedule render' });
			},
			render: (time) => {
				this.lastRender = time;
				this.log({ time, type: 'event', section: 'render' });
				while (this.rafCallbacks.length > 0) {
					// TODO: exclude infinite loop, when rAF is invoked inside rAF
					const task = this.rafCallbacks.shift();
					if (!task) throw new Error('No raf callback found');
					this.log({ time, type: 'shift', queue: 'rafCallback', ast: task });
					this.executeCode(task);
				}
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
				this.log({ time, type: 'delete', queue: 'webApi', ast: node });
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
		type: Exclude<Queue, 'webApi'>;
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
			time:
				Math.ceil(this.time / EVENT_LOOP_FULL_CIRCLE) * EVENT_LOOP_FULL_CIRCLE,
			type: 'end',
		});

		return this.steps;
	}
}
