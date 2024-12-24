import { Node } from 'acorn';

export type Queue =
	| 'macrotask'
	| 'microtask'
	| 'rafCallback'
	| 'callstack'
	| 'webApi'
	| 'console';

export type ELStep =
	| { type: 'start'; time: number }
	| { type: 'push'; queue: Queue; ast: Node }
	| { type: 'pop' | 'shift'; queue: Queue }
	| { type: 'schedule render'; time: number }
	| {
			type: 'event';
			section: 'render' | 'macrotask' | 'microtask';
			time: number;
	  }
	| { type: 'end'; time: number };
