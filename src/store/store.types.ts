import AceEditor from 'react-ace';
import { RefObject } from 'react';
import { List, WebApiSectionElement } from '../types.ts';

type QueueManagerAction = 'push' | 'pop' | 'shift' | 'delete';

export interface QueueManager {
	console: string[];
	callstack: string[];
	rafCallback: string[];
	webApi: WebApiSectionElement[];
	macrotask: string[];
	microtask: string[];
	set({
		list,
		type,
		value,
	}: {
		list: List;
		type: QueueManagerAction;
		value: string | WebApiSectionElement;
	}): void;
	clear(): void;
}

export interface Simulator {
	speed: number;
	setSpeed(time: number): void;
	status: 'idle' | 'running' | 'paused';
	setStatus(status: 'idle' | 'running' | 'paused'): void;
	clear(): void;
}

export interface Wheel {
	render: boolean;
	macrotask: boolean;
	microtask: boolean;
	clear: () => void;
	setStop({
		stop,
		enabled,
	}: {
		stop: 'render' | 'macrotask' | 'microtask';
		enabled: boolean;
	}): void;
}

export interface Time {
	time: number;
	grad: number;
	setTime(grad: number): void;
}

export interface Editor {
	ref: RefObject<AceEditor | null> | null;
	setRef(ref: RefObject<AceEditor>): void;
	source: string;
	setSource(source: string): void;
	pushMarker(range: [number, number]): void;
	popMarker(): void;
	clearEditor(): void;
	clearOldMarkers(): void;
	drawLatestMarker(): void;
	markers: [number, number][];
}

export interface ThemeState {
	isDark: boolean;
	toggle: () => void;
}
