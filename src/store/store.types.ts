type EventLoopStateValuesType  = 'render' | 'task' | 'microtask' | 'enabled';
export interface EventLoopState {
  mutable: Record<EventLoopStateValuesType, boolean>
  immutable: Record<EventLoopStateValuesType, boolean>
  setState(value: boolean, property: EventLoopStateValuesType): void;
  setRender: (isNeeded: boolean) => void;
  setTask: (isNeeded: boolean) => void;
  setMicrotask: (isNeeded: boolean) => void;
  setEnabled: (isEnabled: boolean) => void;
}
