import {create} from 'zustand'
import {EventListsState, EventLoopAnimationState} from "./store.types.ts";

export const useEventLoopAnimationState = create<EventLoopAnimationState>(set => ({
  mutable: {
    render: false,
    task: false,
    microtask: false,
    enabled: false,
  },
  immutable: {
    render: false,
    task: false,
    microtask: false,
    enabled: false,
  },
  setState: (value, property) => {
    set((state) => {
      state.mutable[property] = value;
      return {
        ...state,
        immutable: {
          ...state.immutable,
          [property]: value
        }
      };
    });
  },
}));

export const useEventListsState = create<EventListsState>(set => ({
  console: [],
  microtask_queue: [],
  task_queue: [],
  callstack: [],
  web_api: [],
  set: ({list, value, type}) => set((state) => {
    const updated = type === 'push' ? [...state[list], value] : state[list].slice(0, -1);
    return {
      ...state,
      [list]: updated
    };
  }),
}));