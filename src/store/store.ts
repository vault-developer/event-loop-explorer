import { create } from 'zustand';
import {
	EventListsInterface,
	EventLoopAnimationInterface,
	EventLoopTimeInterface,
} from './store.types.ts';

export const useEventLoopTime = create<EventLoopTimeInterface>((set) => ({
	time: 0,
	increment: () => set((state) => ({ time: state.time + 1 })),
}));

export const useEventLoopAnimation = create<EventLoopAnimationInterface>(
	(set) => ({
		render: false,
		task: false,
		microtask: false,
		enabled: false,
		clear: () =>
			set(() => ({
				render: false,
				task: false,
				microtask: false,
				enabled: false,
			})),
		setState: (value, property) => {
			set(() => ({
				[property]: value,
			}));
		},
	})
);

export const useEventLists = create<EventListsInterface>((set) => ({
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
					if (list === 'task_queue') {
						useEventLoopAnimation.getState().setState(true, 'task');
					} else if (list === 'microtask_queue') {
						useEventLoopAnimation.getState().setState(true, 'microtask');
					}
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
