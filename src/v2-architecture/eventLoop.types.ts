import { Node } from 'acorn';

export type Queue =
	| 'macrotask'
	| 'microtask'
	| 'rafCallback'
	| 'callstack'
	| 'console';

type Section = 'render' | 'macrotask' | 'microtask';

export type WebApiTask = {node: Node, endTime: number};

export type ELTask = 'macrotask' | 'microtask' | 'scheduleRender' | 'render' | 'webApiResolve' ;

export type ELStep =
	| { type: 'start'; time: number }
	| { type: 'push'; queue: Queue; ast: Node; time: number }
	| { type: 'push'; queue: 'webApi'; ast: Node; time: number; end: number }
	| { type: 'delete'; queue: 'webApi'; ast: Node; time: number;}
	| { type: 'pop' | 'shift'; queue: Queue; time: number }
	| { type: 'schedule render'; time: number }
	| { type: 'event'; section: Section; time: number }
	| { type: 'end'; time: number };
