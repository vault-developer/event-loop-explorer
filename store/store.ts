import { create } from 'zustand';
import { Controls, Editor, QueueManager, Time, Wheel } from './store.types';
import { Range } from 'ace-builds';
import { getRowColByCursorPosition } from '@/store/store.utils';

export const useControlsStore = create<Controls>((set) => ({
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
	status: 'idle',
	setStatus: (status) => set(() => ({ status })),
	clear: () =>
		set(() => ({
			speed: 1,
			time: 0,
			status: 'idle',
		})),
}));

export const useTimeStore = create<Time>((set) => ({
	time: 0,
	grad: 0,
	setTime: (time) => set({ time, grad: time % 360 }),
}));

export const useWheelStore = create<Wheel>((set) => ({
	render: false,
	macrotask: false,
	microtask: false,
	setStop: ({ stop, enabled }) => set({ [stop]: enabled }),
	clear: () => {
		useTimeStore.getState().setTime(0);
		set(() => ({
			render: false,
			macrotask: false,
			microtask: false,
		}));
	},
}));

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
					if (state[list].length - filtered.length > 1)
						throw new Error('WebApi callback collapse');
					return { [list]: filtered };
				}
				default:
					return state;
			}
		}),
}));

export const useEditorStore = create<Editor>((set, get) => ({
	ref: null,
	setRef: (ref) => set({ ref }),
	source: '',
	setSource: (source) => set({ source }),
	markers: [],
	clearEditor: () => {
		const markers = get().markers;
		if (markers.length > 0) {
			markers.pop();
		}
		get().clearOldMarkers();
		get().setSource('');
	},
	clearOldMarkers: () => {
		if (!get().ref?.current?.editor) return;
		const session = get().ref!.current!.editor?.getSession?.();
		if (!session) return;
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
		const session = get().ref!.current!.editor?.getSession?.();
		if (!session) return;

		const code = get().source;
		const start = getRowColByCursorPosition(code, latest[0]);
		const end = getRowColByCursorPosition(code, latest[1]);

		const range = new Range(start.row, start.column, end.row, end.column);
		session.addMarker(range, 'selected_lines', 'text');
	},
	pushMarker: ([start, end]) => {
		get().markers.push([start, end]);
		get().clearOldMarkers();
		get().drawLatestMarker();
	},
	popMarker: () => {
		get().markers.pop();
		get().clearOldMarkers();
	},
}));
