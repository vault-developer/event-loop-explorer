import { NodeClass } from '../utils/nodes/Node.abstract.ts';
import { RefObject } from 'react';
import AceEditor from 'react-ace';

type EventLoopStateValuesType = 'render' | 'task' | 'microtask' | 'status';
type EventLoopAnimationStatusType = 'running' | 'paused' | 'disabled';

export interface EventLoopAnimationInterface {
	render: boolean;
	task: boolean;
	microtask: boolean;
	status: EventLoopAnimationStatusType;
	clear(): void;
	setState(
		value: boolean | EventLoopAnimationStatusType,
		property: EventLoopStateValuesType
	): void;
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

export type CallStackValue = {
	display: string;
	range: { start: number; end: number };
};

export interface ActionInterface {
	list: EventListNameType;
	type: 'push' | 'pop' | 'shift' | 'delete';
	value?: string | NodeClass | CallStackValue;
}

export interface EventListsInterface {
	console: string[];
	callstack: CallStackValue[];
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

export interface EditorInterface {
	ref: RefObject<AceEditor | null> | null;
	setRef(ref: RefObject<AceEditor>): void;
	source: string;
	setSource(source: string): void;
	pushMarker(range: [number, number]): void;
	popMarker(): void;
	clearOldMarkers(): void;
	drawLatestMarker(): void;
	markers: [number, number][];
}
