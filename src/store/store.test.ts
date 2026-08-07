import {
	useControlsStore,
	useEditorStore,
	useQueueManagerStore,
	useTimeStore,
	useWheelStore,
} from './store';
import { act, renderHook } from '@testing-library/react';

describe('useControlsStore', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useControlsStore());
		const { speed, status } = result.current;
		expect(speed).toBe(1);
		expect(status).toBe('idle');
	});

	it('should set values', () => {
		const { result } = renderHook(() => useControlsStore());
		act(() => {
			result.current.setSpeed(2);
			result.current.setStatus('running');
		});

		expect(result.current.speed).toBe(2);
		expect(result.current.status).toBe('running');
	});

	it('should clear store to default values', () => {
		const { result } = renderHook(() => useControlsStore());
		act(() => {
			result.current.setSpeed(2);
			result.current.setStatus('running');
		});

		expect(result.current.speed).toBe(2);
		expect(result.current.status).toBe('running');

		act(() => {
			result.current.clear();
		});

		expect(result.current.speed).toBe(1);
		expect(result.current.status).toBe('idle');
	});
});

describe('useTimeStore', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useTimeStore());
		expect(result.current.time).toBe(0);
		expect(result.current.grad).toBe(0);
	});

	it('should set time and grad', () => {
		const { result } = renderHook(() => useTimeStore());
		act(() => {
			result.current.setTime(100);
		});
		expect(result.current.time).toBe(100);
		expect(result.current.grad).toBe(100 % 360);
	});
});

describe('useWheelStore', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useWheelStore());
		expect(result.current.render).toBe(false);
		expect(result.current.macrotask).toBe(false);
		expect(result.current.microtask).toBe(false);
	});

	it('should set stop macrotask', () => {
		const { result } = renderHook(() => useWheelStore());
		act(() => {
			result.current.setStop({ stop: 'macrotask', enabled: true });
		});
		expect(result.current.macrotask).toBe(true);
	});

	it('should set stop microtask', () => {
		const { result } = renderHook(() => useWheelStore());
		act(() => {
			result.current.setStop({ stop: 'microtask', enabled: true });
		});
		expect(result.current.microtask).toBe(true);
	});

	it('should clear store to default values', () => {
		const { result } = renderHook(() => useWheelStore());
		act(() => {
			result.current.setStop({ stop: 'macrotask', enabled: true });
			result.current.setStop({ stop: 'microtask', enabled: true });
			result.current.clear();
		});
		expect(result.current.render).toBe(false);
		expect(result.current.macrotask).toBe(false);
		expect(result.current.microtask).toBe(false);
	});
});

describe('useQueueManagerStore', () => {
	beforeEach(() => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.clear();
		});
	});

	it('should initialize with default empty arrays', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		expect(result.current.console).toEqual([]);
		expect(result.current.rafCallback).toEqual([]);
		expect(result.current.microtask).toEqual([]);
		expect(result.current.macrotask).toEqual([]);
		expect(result.current.callstack).toEqual([]);
		expect(result.current.webApi).toEqual([]);
	});

	it('should push value to console queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'console', value: 'log8', type: 'push' });
		});
		expect(result.current.console).toEqual(['log8']);
	});

	it('should push value to rafCallback queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'rafCallback', value: 'raf', type: 'push' });
		});
		expect(result.current.rafCallback).toEqual(['raf']);
	});

	it('should push value to microtask queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'microtask', value: 'micro', type: 'push' });
		});
		expect(result.current.microtask).toEqual(['micro']);
	});

	it('should push value to macrotask queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'macrotask', value: 'macro', type: 'push' });
		});
		expect(result.current.macrotask).toEqual(['macro']);
	});

	it('should push value to callstack queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'callstack', value: 'call', type: 'push' });
		});
		expect(result.current.callstack).toEqual(['call']);
	});

	it('should push value to webApi queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'webApi', value: 'web', type: 'push' });
		});
		expect(result.current.webApi).toEqual(['web']);
	});

	it('should pop value from console queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'console', value: 'log1', type: 'push' });
			result.current.set({ list: 'console', value: 'log2', type: 'push' });
			result.current.set({ list: 'console', value: 'any', type: 'pop' });
		});
		expect(result.current.console).toEqual(['log1']);
	});

	it('should shift value from console queue', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'console', value: 'log1', type: 'push' });
			result.current.set({ list: 'console', value: 'log2', type: 'push' });
			result.current.set({
				list: 'console',
				value: null as never,
				type: 'shift',
			});
		});
		console.log(result.current.console);
		expect(result.current.console).toEqual(['log2']);
	});

	it('should clear store to default values', () => {
		const { result } = renderHook(() => useQueueManagerStore());
		act(() => {
			result.current.set({ list: 'console', value: 'log', type: 'push' });
			result.current.set({ list: 'microtask', value: 'micro', type: 'push' });
			result.current.set({ list: 'rafCallback', value: 'raf', type: 'push' });
			result.current.set({ list: 'macrotask', value: 'macro', type: 'push' });
			result.current.set({ list: 'callstack', value: 'call', type: 'push' });
			result.current.set({ list: 'webApi', value: 'web', type: 'push' });
			result.current.clear();
		});
		expect(result.current.console).toEqual([]);
		expect(result.current.microtask).toEqual([]);
		expect(result.current.rafCallback).toEqual([]);
		expect(result.current.macrotask).toEqual([]);
		expect(result.current.callstack).toEqual([]);
		expect(result.current.webApi).toEqual([]);
	});
});

describe('useEditorStore', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useEditorStore());
		expect(result.current.ref).toBe(null);
		expect(result.current.source).toBe('');
		expect(result.current.markers).toEqual([]);
	});

	it('should set ref', () => {
		const mockRef = { current: { editor: {} } };
		const { result } = renderHook(() => useEditorStore());
		act(() => {
			result.current.setRef(mockRef as never);
		});
		expect(result.current.ref).toBe(mockRef);
	});

	it('should set source', () => {
		const { result } = renderHook(() => useEditorStore());
		act(() => {
			result.current.setSource('test source');
		});
		expect(result.current.source).toBe('test source');
	});

	it('should clear editor', () => {
		const { result } = renderHook(() => useEditorStore());
		act(() => {
			result.current.setSource('test source');
			result.current.pushMarker([0, 10]);
			result.current.clearEditor();
		});
		expect(result.current.source).toBe('');
		expect(result.current.markers).toEqual([]);
	});

	it('should push and pop marker', () => {
		const { result } = renderHook(() => useEditorStore());
		act(() => {
			result.current.pushMarker([0, 10]);
			result.current.pushMarker([10, 20]);
			result.current.popMarker();
		});
		expect(result.current.markers).toEqual([[0, 10]]);
	});
});
