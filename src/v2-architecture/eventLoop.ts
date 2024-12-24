import { AST } from './getAstFromText.ts';
import * as eslintScope from 'eslint-scope';
import { ScopeManager } from 'eslint-scope';
import { ELStep, Queue } from './eventLoop.types.ts';
import { astTraverse } from './ast.traverse.ts';
import {
	EVENT_LOOP_FULL_CIRCLE,
	EVENT_LOOP_WHEEL_STOPS,
} from './eventLoop.constants.ts';
import { Node } from 'acorn';

export class EventLoop {
	private macrotasks: Node[] = [];
	private microtasks: Node[] = [];
	private rafCallbacks: Node[] = [];
	private callstack: Node[] = [];
	private webApi: Node[] = [];
	private console: Node[] = [];

	private scope: ScopeManager = {} as ScopeManager;
	private steps: ELStep[] = [];

	// to track last time when render happened
	private isRenderScheduled = false;
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
		const grad = this.time % EVENT_LOOP_FULL_CIRCLE;
		const hasMacrotasks = this.macrotasks.length > 0;
		const hasMicrotasks = this.microtasks.length > 0;

		const timeToScheduleRender =
			this.lastRender +
			EVENT_LOOP_FULL_CIRCLE * 2 -
			EVENT_LOOP_WHEEL_STOPS.render;
		const timeToNextRender = this.lastRender + EVENT_LOOP_FULL_CIRCLE * 2;

		const handleRenderSchedule = () => {
			this.log({
				type: 'schedule render',
				time: timeToScheduleRender,
			});
			this.time = timeToScheduleRender;
			this.isRenderScheduled = true;
		};

		const handleRenderEvent = () => {
			this.log({
				type: 'event',
				section: 'render',
				time: timeToNextRender,
			});
			this.lastRender = timeToNextRender;
			this.time = timeToNextRender;
			this.isRenderScheduled = false;
		};

		// Generic function to process tasks (microtasks or macrotasks)
		const processTasks = (
			tasks: Node[],
			section: 'microtask' | 'macrotask',
			grads: number[]
		) => {
			const nextGrad = grads.find((task) => grad < task) || grads[0];
			const diff =
				nextGrad - grad > 0
					? nextGrad - grad
					: nextGrad + EVENT_LOOP_FULL_CIRCLE - grad;
			const newTime = this.time + diff;

			// consider scheduling render
			if (newTime >= timeToScheduleRender && !this.isRenderScheduled) {
				handleRenderSchedule();
			}

			// consider render event
			if (newTime >= timeToNextRender) {
				handleRenderEvent();
			}

			this.log({
				type: 'event',
				section,
				time: newTime,
			});

			this.time = newTime;

			// Process all tasks
			while (tasks.length > 0) {
				const ast = tasks.shift() as Node;
				this.log({
					type: 'shift',
					queue: section,
				});
				this.executeCode(ast);
			}
		};

		if (hasMicrotasks) {
			processTasks(
				this.microtasks,
				'microtask',
				EVENT_LOOP_WHEEL_STOPS.microtasks
			);
		} else if (hasMacrotasks) {
			processTasks(this.macrotasks, 'macrotask', [
				EVENT_LOOP_WHEEL_STOPS.macrotask,
			]);
		} else if (this.isRenderScheduled) {
			// no tasks but pending render
			handleRenderEvent();
		} else if (this.lastRender === EVENT_LOOP_WHEEL_STOPS.render) {
			// we should render at least once
			handleRenderSchedule();
			handleRenderEvent();
		}
	}

	private addToQueue({ type, ast }: { type: Queue; ast: Node }) {
		const queue = {
			macrotask: this.macrotasks,
			microtask: this.microtasks,
			rafCallback: this.rafCallbacks,
			callstack: this.callstack,
			webApi: this.webApi,
			console: this.console,
		}[type];
		queue.push(ast);

		this.log({
			type: 'push',
			queue: type,
			ast,
		});
	}

	private executeCode(ast: Node) {
		const logger = this.log.bind(this);
		const addToQueue = this.addToQueue.bind(this);
		astTraverse({ ast, logger, addToQueue });
	}

	// calculate EL steps based on AST
	public calculate(ast: AST) {
		this.scope = eslintScope.analyze(ast, {
			ecmaVersion: 2024,
			sourceType: 'script',
		});

		this.log({
			type: 'start',
			time: this.time,
		});

		this.addToQueue({
			type: 'macrotask',
			ast,
		});

		while (!this.isFinished) {
			this.processNextTask();
		}

		this.log({
			type: 'end',
			time: Math.ceil(this.time / EVENT_LOOP_FULL_CIRCLE) * EVENT_LOOP_FULL_CIRCLE,
		});

		return {
			scope: this.scope,
			steps: this.steps,
		};
	}
}
