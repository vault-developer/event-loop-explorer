import { getSimulationSteps } from '@/utils/getSimulationSteps/getSimulationSteps';
import { EXAMPLES } from '@/app/(main)/sections/configurator/controls.data';

describe('getSimulationSteps', () => {
	it('should calculate simple synchronous code', () => {
		const steps = getSimulationSteps(EXAMPLES.synchronous.code);
		steps.forEach((step) => {
			if ('ast' in step) {
				step.ast = null as never;
			}
		});

		const expected = [
			{
				ast: null,
				time: 0,
				type: 'start',
				value: 'script',
			},
			{
				stop: 'macrotask',
				time: 0,
				type: 'markStop',
				value: true,
			},
			{
				ast: null,
				queue: 'macrotask',
				time: 0,
				type: 'push',
				value: 'script',
			},
			{
				ast: null,
				queue: 'macrotask',
				time: 270,
				type: 'shift',
				value: 'script',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'push',
				value: 'console.log(1)',
			},
			{
				ast: null,
				queue: 'console',
				time: 270,
				type: 'push',
				value: '1',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'pop',
				value: 'console.log(1)',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'push',
				value: 'console.log(2)',
			},
			{
				ast: null,
				queue: 'console',
				time: 270,
				type: 'push',
				value: '2',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'pop',
				value: 'console.log(2)',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'push',
				value: 'console.log(3)',
			},
			{
				ast: null,
				queue: 'console',
				time: 270,
				type: 'push',
				value: '3',
			},
			{
				ast: null,
				queue: 'callstack',
				time: 270,
				type: 'pop',
				value: 'console.log(3)',
			},
			{
				stop: 'macrotask',
				time: 270,
				type: 'markStop',
				value: false,
			},
			{
				stop: 'render',
				time: 360,
				type: 'markStop',
				value: true,
			},
			{
				time: 450,
				type: 'render',
			},
			{
				stop: 'render',
				time: 450,
				type: 'markStop',
				value: false,
			},
			{
				time: 720,
				type: 'end',
			},
		];

		expect(steps).toEqual(expected);
	});
});
