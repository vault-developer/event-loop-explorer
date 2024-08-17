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
    switch (type) {
      case 'push':
        if (list === 'task_queue') {
          useEventLoopAnimationState.getState().setState(true, 'task');
        } else if (list === 'microtask_queue') {
          useEventLoopAnimationState.getState().setState(true, 'microtask');
        }
        return {
          ...state,
          [list]: [...state[list], value]
        };
      case 'pop':
        return {
          ...state,
          [list]: state[list].slice(0, -1)
        };
      case 'shift':
        return {
          ...state,
          [list]: state[list].slice(1)
        };
      default:
        return state;
    }
  }),
}));