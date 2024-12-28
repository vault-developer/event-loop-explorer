import { ELSerialisedStep } from './calculator/calculator.types.ts';
import {
	useQueueManagerStore,
	useSimulatorStore,
	useWheelStore,
} from 'store/store.ts';
import { delay } from 'utils/delay.ts';

export const simulate = (steps: ELSerialisedStep[], onStop: () => void) => {
	const groupedSteps = steps.reduce(
		(acc: Record<string, ELSerialisedStep[]>, item: ELSerialisedStep) => {
			if (!acc[item.time]) {
				acc[item.time] = [];
			}
			acc[item.time].push(item);
			return acc;
		},
		{}
	);

	console.log('simulation start for steps', groupedSteps);

	const animate = async () => {
		while (useSimulatorStore.getState().status === 'paused') {
			await delay(250);
		}
		if (useSimulatorStore.getState().status === 'idle') return;
		const time = useSimulatorStore.getState().time + 1;
		const grad = time % 360;

		useSimulatorStore.getState().setTime(time);
		useWheelStore.getState().setGrad(grad);

		const steps = groupedSteps[time];
		if (steps !== undefined) {
			for (const step of steps) {
				while (useSimulatorStore.getState().status === 'paused') {
					await delay(250);
				}
				if (useSimulatorStore.getState().status === 'idle') return;
				const isFinished = await simulateStep(step, onStop);
				if (isFinished) return;
			}
		}

		requestAnimationFrame(animate);
	};
	animate();
};

// TODO: complete simulation
const simulateStep = async (step: ELSerialisedStep, onStop: () => void) => {
	switch (step.type) {
		case 'start': {
			break;
		}
		case 'push': {
			if (step.queue === 'webApi') {
				useQueueManagerStore.getState().set({
					list: 'webApi',
					type: 'push',
					value: {
						start: step.time,
						end: step.end,
						value: step.value,
					},
				});
			} else {
				useQueueManagerStore.getState().set({
					list: step.queue,
					type: 'push',
					value: step.value,
				});
			}
			await delay(1000);
			break;
		}
		case 'shift':
		case 'pop': {
			useQueueManagerStore.getState().set({
				list: step.queue,
				type: step.type,
				value: step.value,
			});
			await delay(1000);
			break;
		}
		case 'markStop': {
			useWheelStore.getState().setStop({
				stop: step.stop,
				enabled: step.value,
			});
			break;
		}
		case 'render': {
			if (!useQueueManagerStore.getState().rafCallback.length) {
				await delay(1000);
			}
			break;
		}
		case 'delete': {
			useQueueManagerStore
				.getState()
				.set({ list: 'webApi', type: 'delete', value: step.value });
			break;
		}
		case 'end': {
			onStop();
			return true;
		}
		default:
			console.log('step not managed', step);
			break;
	}
};
