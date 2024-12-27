import { create } from 'zustand';
import { Editor, QueueManager, Simulator, Wheel } from './store.types.ts';

export const useQueueManagerStore = create<QueueManager>((set) => ({
	console: [],
	render_callbacks: [],
	microtask_queue: [],
	task_queue: [],
	callstack: [],
	web_api: [],
	clear: () =>
		set(() => ({
			console: [],
			render_callbacks: [],
			microtask_queue: [],
			task_queue: [],
			callstack: [],
			web_api: [],
		})),
	set: ({ list, value, type }) =>
		set((state) => {
			switch (type) {
				case 'push':
					return { [list]: [...state[list], value] };
				case 'pop':
					return { [list]: state[list].slice(0, -1) };
				case 'shift':
					return { [list]: state[list].slice(1) };
				case 'delete':
					return { [list]: state[list].filter((el) => el !== value) };
				default:
					return state;
			}
		}),
}));

export const useEditorStore = create<Editor>((set) => ({
	ref: null,
	setRef: (ref) => set({ ref }),
	source: '',
	setSource: (source) => set({ source }),
}));

export const useWheelStore = create<Wheel>((set) => ({
	grad: 0,
	render: false,
	task: false,
	microtask: false,
	setGrad: (grad) => set({ grad }),
	setStop: (stop, enabled) => set({ [stop]: enabled }),
}));

export const useSimulatorStore = create<Simulator>((set) => ({
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
	time: -1,
	setTime: (time) => set(() => ({ time })),
	status: 'idle',
	setStatus: (status) => set(() => ({ status })),
}));
