import { List, WebApiSectionElement } from '@/utils/types';
import { RefObject } from 'react';
import type { AceEditorInstance } from '@/utils/aceEditor';

export interface Controls {
	speed: number;
	setSpeed(time: number): void;
	status: 'idle' | 'running' | 'paused';
	setStatus(status: 'idle' | 'running' | 'paused'): void;
	clear(): void;
}

export interface Time {
	time: number;
	grad: number;
	setTime(grad: number): void;
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
		type: 'push' | 'pop' | 'shift' | 'delete';
		value: string | WebApiSectionElement;
	}): void;
	clear(): void;
}

export interface Editor {
	ref: RefObject<AceEditorInstance | null> | null;
	setRef(ref: RefObject<AceEditorInstance>): void;
	source: string;
	setSource(source: string): void;
	pushMarker(range: [number, number]): void;
	popMarker(): void;
	clearEditor(): void;
	clearOldMarkers(): void;
	drawLatestMarker(): void;
	markers: [number, number][];
}
