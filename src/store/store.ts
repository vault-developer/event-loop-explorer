import { create } from 'zustand';
import {
	Editor,
	QueueManager,
	Simulator,
	ThemeState,
	Wheel,
} from './store.types.ts';
import { indexToRowColumn } from 'utils/editor.ts';
import { Range } from 'ace-builds';

export const useThemeStore = create<ThemeState>((set) => ({
	isDark: true,
	toggle: () => set((theme) => ({ isDark: !theme.isDark })),
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

export const useWheelStore = create<Wheel>((set) => ({
	grad: 0,
	render: false,
	macrotask: false,
	microtask: false,
	setGrad: (grad) => set({ grad }),
	setStop: ({ stop, enabled }) => set({ [stop]: enabled }),
	clear: () =>
		set(() => ({
			grad: 0,
			render: false,
			macrotask: false,
			microtask: false,
		})),
}));

export const useSimulatorStore = create<Simulator>((set) => ({
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
	time: 0,
	setTime: (time) => set(() => ({ time })),
	status: 'idle',
	setStatus: (status) => set(() => ({ status })),
	clear: () =>
		set(() => ({
			speed: 1,
			time: 0,
			status: 'idle',
		})),
}));

// TODO: move internal methods to utils
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
		get().markers.push([start, end]);
		get().clearOldMarkers();
		get().drawLatestMarker();
	},
	popMarker: () => {
		get().markers.pop();
		get().clearOldMarkers();
	},
}));
