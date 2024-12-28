import { create } from 'zustand';
import { Editor, QueueManager, Simulator, Wheel } from './store.types.ts';

export const useQueueManagerStore = create<QueueManager>((set) => ({
	console: [],
	rafCallback: [],
	microtask: [],
	macrotask: [],
	callstack: [],
	webApi: [],
	clear: () =>
		set(() => ({
			console: [],
			rafCallback: [],
			microtask: [],
			macrotask: [],
			callstack: [],
			webApi: [],
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
				case 'delete': {
					const filtered = state[list].filter((el) => {
						if (typeof el === 'string') return el !== value;
						return el.value !== value;
					});
					// TODO: filter by unique key instead of values
					if (state[list].length - filtered.length > 1) throw new Error('WebApi callback collapse');
					return { [list]: filtered };
				}
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
	macrotask: false,
	microtask: false,
	setGrad: (grad) => set({ grad }),
	setStop: ({ stop, enabled }) => set({ [stop]: enabled }),
}));

export const useSimulatorStore = create<Simulator>((set) => ({
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
	time: -1,
	setTime: (time) => set(() => ({ time })),
	status: 'idle',
	setStatus: (status) => set(() => ({ status })),
}));
