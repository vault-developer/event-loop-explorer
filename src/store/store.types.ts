import {NodeClass} from "../utils/nodes/Node.abstract.ts";

type EventLoopStateValuesType = 'render' | 'task' | 'microtask' | 'enabled';

export interface EventLoopAnimationState {
  mutable: Record<EventLoopStateValuesType, boolean>
  immutable: Record<EventLoopStateValuesType, boolean>
  clear(): void;
  setState(value: boolean, property: EventLoopStateValuesType): void;
}

export interface EventLoopTime {
  mutable: {
    time: number;
  }
  increment(): void;
  set(time: number): void;
}

export type EventListNameType = 'console' | 'web_api' | 'task_queue' | 'microtask_queue' | 'callstack' | 'render_callbacks';

export interface ActionInterface {
  list: EventListNameType;
  type: 'push' | 'pop' | 'shift';
  value?: string | NodeClass;
}

export interface EventListsState {
  mutable: {
    console: string[];
    callstack: string[];
    render_callbacks: NodeClass[];
    web_api: NodeClass[];
    task_queue: NodeClass[];
    microtask_queue: NodeClass[];
  }
  immutable: {
    console: string[];
    callstack: string[];
    render_callbacks: NodeClass[];
    web_api: NodeClass[];
    task_queue: NodeClass[];
    microtask_queue: NodeClass[];
  }
  set({list, type, value}: ActionInterface): void;
  clear(): void;
}
