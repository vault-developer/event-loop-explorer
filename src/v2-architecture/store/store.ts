import { create } from 'zustand';
import { Wheel } from './store.types.ts';

export const useWheel = create<Wheel>((set) => ({
	grad: 0,
	render: false,
	task: false,
	microtask: false,
	setGrad: (grad) => set({ grad }),
	setStop: (stop, enabled) => set({ [stop]: enabled }),
}));
