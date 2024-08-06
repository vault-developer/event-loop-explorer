import {create} from 'zustand'
import {EventLoopState} from "./store.types.ts";

export const useEventLoopState = create<EventLoopState>((set, get) => ({
  mutable: {
    render: false,
    task: false,
    microtask: false,
  },
  immutable: {
    render: false,
    task: false,
    microtask: false,
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
  setRender: isNeeded => get().setState(isNeeded, 'render'),
  setTask: isNeeded => get().setState(isNeeded, 'task'),
  setMicrotask: isNeeded => get().setState(isNeeded, 'microtask'),
}));