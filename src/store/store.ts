import { create } from 'zustand';
import {
	EditorInterface,
	EventListsInterface,
	EventLoopAnimationInterface,
	EventLoopTimeInterface,
	SpeedFactorInterface,
} from './store.types.ts';
import { indexToRowColumn } from '../utils/editor.ts';
import { Range } from 'ace-builds';

export const useSpeedFactor = create<SpeedFactorInterface>((set) => ({
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
}));

export const useEventLoopTime = create<EventLoopTimeInterface>((set) => ({
	time: 0,
	increment: () => set((state) => ({ time: state.time + 1 })),
}));

export const useEventLoopAnimation = create<EventLoopAnimationInterface>(
	(set) => ({
		render: false,
		task: false,
		microtask: false,
		status: 'disabled',
		clear: () =>
			set(() => ({
				render: false,
				task: false,
				microtask: false,
				status: 'disabled',
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

export const useEditor = create<EditorInterface>((set, get) => ({
	ref: null,
	setRef: (ref) => set({ ref }),
	source: '',
	setSource: (source) => set({ source }),
	markers: [],
	clearOldMarkers: () => {
		if (!get().ref?.current?.editor) return;
		const session = get().ref!.current!.editor.getSession();
		session.clearAnnotations();
		const markers = session.getMarkers();
		for (const id in markers) {
			session.removeMarker(id as unknown as number);
		}
	},
	drawLatestMarker: () => {
		if (!get().ref?.current?.editor) return;
		const markers = get().markers;
		const latest = markers[markers.length - 1];
		if (!latest) return;
		const session = get().ref!.current!.editor.getSession();

		const code = get().source;
		const start = indexToRowColumn(code, latest[0]);
		const end = indexToRowColumn(code, latest[1]);

		const range = new Range(start.row, start.column, end.row, end.column);
		session.addMarker(range, 'selected_lines', 'text');
	},
	pushMarker: ([start, end]) => {
		const markers = get().markers;
		if (markers.length > 0) {
			markers.pop();
		}
		get().markers.push([start, end]);
		get().clearOldMarkers();
		get().drawLatestMarker();
	},
	popMarker: () => {
		get().markers.pop();
		get().clearOldMarkers();
	},
}));
