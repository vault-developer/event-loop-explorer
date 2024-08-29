import { NodeClass } from '../utils/nodes/Node.abstract.ts';

type EventLoopStateValuesType = 'render' | 'task' | 'microtask' | 'enabled';

export interface EventLoopAnimationInterface {
	render: boolean;
	task: boolean;
	microtask: boolean;
	enabled: boolean;
	clear(): void;
	setState(value: boolean, property: EventLoopStateValuesType): void;
}

export interface EventLoopTimeInterface {
	time: number;
	increment(): void;
}

export type EventListNameType =
	| 'console'
	| 'web_api'
	| 'task_queue'
	| 'microtask_queue'
	| 'callstack'
	| 'render_callbacks';

export interface ActionInterface {
	list: EventListNameType;
	type: 'push' | 'pop' | 'shift' | 'delete';
	value?: string | NodeClass;
}

export interface EventListsInterface {
	console: string[];
	callstack: string[];
	render_callbacks: NodeClass[];
	web_api: NodeClass[];
	task_queue: NodeClass[];
	microtask_queue: NodeClass[];
	set({ list, type, value }: ActionInterface): void;
	clear(): void;
}

export interface SpeedFactorInterface {
	speed: number;
	setSpeed(key: number): void;
}
