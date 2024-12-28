export interface WebApiSectionElement {
	start: number;
	end: number;
	value: string;
}

export type Queue =
	| 'macrotask'
	| 'microtask'
	| 'rafCallback'
	| 'callstack'
	| 'console';

export type List = Queue | 'webApi';
