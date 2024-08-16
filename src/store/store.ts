import {create} from 'zustand'
import {EventLoopState} from "./store.types.ts";

export const useEventLoopAnimationState = create<EventLoopState>(set => ({
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