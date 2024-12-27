import AceEditor from "react-ace";
import {RefObject} from "react";
import {WebApiQueueElement} from "../types.ts";

type List =
	| 'console'
	| 'render_callbacks'
	| 'web_api'
	| 'task_queue'
	| 'microtask_queue';
type QueueManagerAction = 'push' | 'pop' | 'shift' | 'delete';

export interface QueueManager {
	console: string[];
	callstack: string[];
	render_callbacks: string[];
	web_api: WebApiQueueElement[];
	task_queue: string[];
	microtask_queue: string[];

	set({
		list,
		type,
		value,
	}: {
		list: List;
		type: QueueManagerAction;
		value: string | WebApiQueueElement;
	}): void;

	clear(): void;
}

export interface Editor {
	ref: RefObject<AceEditor | null> | null;
	setRef(ref: RefObject<AceEditor>): void;
	source: string;
	setSource(source: string): void;
}

export interface Simulator {
	time: number;
	setTime(time: number): void;
	speed: number;
	setSpeed(time: number): void;
	status: 'idle' | 'running' | 'paused';
	setStatus(status: 'idle' | 'running' | 'paused'): void;
}

export interface Wheel {
	grad: number;
	render: boolean;
	task: boolean;
	microtask: boolean;
	setGrad(grad: number): void;
	setStop(stop: 'render' | 'task' | 'microtask', enabled: boolean): void;
}
