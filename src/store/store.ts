import {create} from 'zustand'
import {EventLoopState} from "./store.types.ts";

export const useEventLoopState = create<EventLoopState>(set => ({
  mutable: {
    render: false,
    task: false,
    microtask: false,
    enabled: true,
  },
  immutable: {
    render: false,
    task: false,
    microtask: false,
    enabled: true,
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