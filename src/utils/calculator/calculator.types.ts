import { Node } from 'acorn';
import { Queue } from 'src/types.ts';

type WheelStop = 'render' | 'macrotask' | 'microtask';

export type WebApiTask = { node: Node; endTime: number };

export type ELTask =
	| 'macrotask'
	| 'microtask'
	| 'scheduleRender'
	| 'render'
	| 'webApiResolve';

export type ELStep =
	| { type: 'start'; time: number; ast: Node }
	| { type: 'push'; queue: Queue; ast: Node; time: number }
	| { type: 'push'; queue: 'webApi'; ast: Node; time: number; end: number }
	| { type: 'delete'; queue: 'webApi'; ast: Node; time: number }
	| { type: 'pop' | 'shift'; queue: Queue; time: number; ast: Node }
	| { type: 'render'; time: number }
	| { type: 'markStop'; stop: WheelStop; time: number; value: boolean }
	| { type: 'end'; time: number };

export type ELSerialisedStep =
	| { type: 'start'; time: number; ast: Node; value: string }
	| { type: 'push'; queue: Queue; ast: Node; time: number; value: string }
	| {
			type: 'push';
			queue: 'webApi';
			ast: Node;
			time: number;
			end: number;
			value: string;
	  }
	| { type: 'delete'; queue: 'webApi'; ast: Node; time: number; value: string }
	| {
			type: 'pop' | 'shift';
			queue: Queue;
			time: number;
			ast: Node;
			value: string;
	  }
	| { type: 'render'; time: number }
	| { type: 'markStop'; stop: WheelStop; time: number; value: boolean }
	| { type: 'end'; time: number };
