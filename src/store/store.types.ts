type EventLoopStateValuesType = 'render' | 'task' | 'microtask' | 'enabled';

export interface EventLoopState {
  mutable: Record<EventLoopStateValuesType, boolean>
  immutable: Record<EventLoopStateValuesType, boolean>
  setState(value: boolean, property: EventLoopStateValuesType): void;
}
