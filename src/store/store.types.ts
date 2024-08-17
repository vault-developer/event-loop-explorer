import {NodeClass} from "../utils/nodes/Node.abstract.ts";

type EventLoopStateValuesType = 'render' | 'task' | 'microtask' | 'enabled';

export interface EventLoopAnimationState {
  mutable: Record<EventLoopStateValuesType, boolean>
  immutable: Record<EventLoopStateValuesType, boolean>

  setState(value: boolean, property: EventLoopStateValuesType): void;
}

export type EventListNameType = 'console' | 'web_api' | 'task_queue' | 'microtask_queue' | 'callstack';

export interface EventListsState {
  console: string[];
  web_api: object[];
  task_queue: NodeClass[];
  microtask_queue: object[];
  callstack: object[];

  set({list, type, value}: { list: EventListNameType, type: 'push' | 'pop' | 'shift', value?: string | object }): void;
}
