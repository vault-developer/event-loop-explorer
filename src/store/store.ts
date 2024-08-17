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
  mutable: {
    console: [],
    render_callbacks: [],
    microtask_queue: [],
    task_queue: [],
    callstack: [],
    web_api: [],
  },
  immutable: {
    console: [],
    render_callbacks: [],
    microtask_queue: [],
    task_queue: [],
    callstack: [],
    web_api: [],
  },
  set: ({list, value, type}) => set((state) => {
    switch (type) {
      case 'push':
        if (list === 'task_queue') {
          useEventLoopAnimationState.getState().setState(true, 'task');
        } else if (list === 'microtask_queue') {
          useEventLoopAnimationState.getState().setState(true, 'microtask');
        }
        (state.mutable[list] as any).push(value);
        return {
          ...state,
          immutable: {
            ...state.immutable,
            [list]: [...state.immutable[list], value]
          }
        };
      case 'pop':
        (state.mutable[list] as any).pop(value);
        return {
          ...state,
          immutable: {
            ...state.immutable,
            [list]: state.immutable[list].slice(0, -1)
          }
        };
      case 'shift':
        (state.mutable[list] as any).shift(value);
        return {
          ...state,
          immutable: {
            ...state.immutable,
            [list]: state.immutable[list].slice(1)
          }
        };
      default:
        return state;
    }
  }),
}));