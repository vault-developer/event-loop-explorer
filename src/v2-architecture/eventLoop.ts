import { AST } from './getAstFromText.ts';
import * as eslintScope from 'eslint-scope';
import { ScopeManager } from 'eslint-scope';
import { ELStep, ELTask, Queue, WebApiTask } from './eventLoop.types.ts';
import { astTraverse } from './ast.traverse.ts';
import {
	EVENT_LOOP_FULL_CIRCLE,
	EVENT_LOOP_WHEEL_STOPS,
	EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD,
} from './eventLoop.constants.ts';
import { Node } from 'acorn';
import { timeToNextStop } from './eventLoop.utils.ts';
import { isSetTimeoutExpression } from './ast.utils.ts';
import { isArrowFunctionExpression, isCallExpression } from './ast.guards.ts';

const {
	macrotask: macrotaskStops,
	render: renderStops,
	microtasks: microtasksStops,
	scheduleRender: scheduleRenderStops,
} = EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD;

export class EventLoop {
	private macrotasks: Node[] = [];
	private microtasks: Node[] = [];
	private rafCallbacks: Node[] = [];
	private callstack: Node[] = [];
	private webApi: WebApiTask[] = [];
	private console: Node[] = [];

	private scope: ScopeManager = {} as ScopeManager;
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

	private processNextTask() {
		const now = this.time;
		const grad = this.time % EVENT_LOOP_FULL_CIRCLE;

		const hasMacrotasks = this.macrotasks.length > 0;
		const hasMicrotasks = this.microtasks.length > 0;
		const hasWebApi = this.webApi.length > 0;
		// render is triggered only every second loop for simulation purposes
		const hasRender = (Math.floor(this.time / 360) + 1) % 2;

		const potentialTasks: { key: ELTask; time: number }[] = [
			{
				key: 'macrotask',
				time: hasMacrotasks
					? now + timeToNextStop(macrotaskStops, grad)
					: Infinity,
			},
			{
				key: 'microtask',
				time: hasMicrotasks
					? now + timeToNextStop(microtasksStops, grad)
					: Infinity,
			},
			{
				key: 'scheduleRender',
				time: now + timeToNextStop(scheduleRenderStops, grad) + 360 * hasRender,
			},
			{
				key: 'render',
				time: now + timeToNextStop(renderStops, grad) + 360 * hasRender,
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
				this.log({ time, type: 'shift', queue: 'macrotask' });
				this.executeCode(task);
			},
			microtask: (time) => {
				this.log({ time, type: 'event', section: 'microtask' });
				while (this.microtasks.length > 0) {
					const task = this.microtasks.shift();
					if (!task) throw new Error('No microtask found');
					this.log({ time, type: 'shift', queue: 'microtask' });
					this.executeCode(task);
				}
			},
			scheduleRender: (time) => {
				this.log({ time, type: 'schedule render' });
			},
			render: (time) => {
				this.lastRender = time;
				this.log({ time, type: 'event', section: 'render' });
			},
			webApiResolve: (time) => {
				const webApiTask = this.webApi.shift();
				if (!webApiTask) throw new Error('No webApi task found');
				const { node } = webApiTask;
				if (
					!isCallExpression(node) ||
					!isSetTimeoutExpression(node) ||
					!isArrowFunctionExpression(node.arguments[0]) ||
					!isCallExpression(node.arguments[0].body)
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
		});
	}

	// calculate EL steps based on AST
	public calculate(ast: AST) {
		this.scope = eslintScope.analyze(ast, {
			ecmaVersion: 2024,
			sourceType: 'script',
		});

		this.log({
			time: this.time,
			type: 'start',
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

		return {
			scope: this.scope,
			steps: this.steps,
		};
	}
}
