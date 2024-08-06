import { create } from 'zustand'

export interface EventLoopMutatedState {
  render: boolean;
  task: boolean;
  microtask: boolean;
}
export const useEventLoopMutatedState = create<EventLoopMutatedState>(() => ({
  render: false,
  task: false,
  microtask: false,
}));

export interface EventLoopState extends EventLoopMutatedState {
  setRender: (isNeeded: boolean) => void;
  setTask: (isNeeded: boolean) => void;
  setMicrotask: (isNeeded: boolean) => void;
}
export const useEventLoopState = create<EventLoopState>((set) => ({
  render: false,
  task: false,
  microtask: false,
  setRender: isNeeded => {
    set((state) => ({ ...state, render: isNeeded }));
    useEventLoopMutatedState.getState().render = isNeeded;
  },
  setTask: isNeeded => {
    set((state) => ({ ...state, task: isNeeded }));
    useEventLoopMutatedState.getState().task = isNeeded;
  },
  setMicrotask: isNeeded => {
    set((state) => ({ ...state, microtask: isNeeded }));
    useEventLoopMutatedState.getState().microtask = isNeeded;
  },
}));