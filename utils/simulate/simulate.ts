import { ELSerialisedStep } from '@/utils/types';
import {
	useEditorStore,
	useQueueManagerStore,
	useControlsStore,
	useTimeStore,
	useWheelStore,
} from '@/store/store';
import { EVENT_LOOP_WHEEL_STOPS } from '@/utils/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

	console.log('simulation started for grouped steps:', groupedSteps);

	const animate = async () => {
		if (useControlsStore.getState().status === 'running') {
			const steps = groupedSteps[useTimeStore.getState().time];
			if (steps !== undefined) {
				for (const step of steps) {
					while (useControlsStore.getState().status === 'paused') {
						await delay(250);
					}
					if (useControlsStore.getState().status === 'idle') return;
					const isFinished = await simulateStep(step, onStop);
					if (isFinished) return;
				}
			}
			const { speed } = useControlsStore.getState();
			const { time, setTime } = useTimeStore.getState();
			const nextTime = getNextTime({ time, speed, groupedSteps });
			setTime(nextTime);
			requestAnimationFrame(animate);
		} else if (useControlsStore.getState().status === 'paused') {
			await delay(250);
			return animate();
		}
	};
	animate();
};

const getNextTime = ({
	time,
	speed,
	groupedSteps,
}: {
	time: number;
	speed: number;
	groupedSteps: Record<string, ELSerialisedStep[]>;
}) => {
	const minStep = 0.25;
	const minTime = Math.ceil(time + minStep);
	const maxTime = time + speed;
	for (let i = minTime; i < maxTime; i++) {
		if (groupedSteps[i]?.length > 0) return i;
	}
	return maxTime;
};

const considerDelay = async () => {
	const { macrotask, microtask, render } = useWheelStore.getState();
	const { grad } = useTimeStore.getState();
	const { renders, microtasks, macrotasks } = EVENT_LOOP_WHEEL_STOPS;
	const speed = useControlsStore.getState().speed;

	const needDelay =
		(render && renders.includes(grad)) ||
		(macrotask && macrotasks.includes(grad)) ||
		(microtask && microtasks.includes(grad));

	if (needDelay) await delay(1000 / speed);
};

const simulateStep = async (step: ELSerialisedStep, onStop: () => void) => {
	switch (step.type) {
		case 'start': {
			break;
		}
		case 'push': {
			// update editor
			if (step.queue === 'callstack') {
				useEditorStore.getState().pushMarker([step.ast.start, step.ast.end]);
			}

			// TODO: unify with other queues
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
			await considerDelay();
			break;
		}
		case 'shift':
		case 'pop': {
			// update editor
			if (step.queue === 'callstack') {
				useEditorStore.getState().popMarker();
			}

			useQueueManagerStore.getState().set({
				list: step.queue,
				type: step.type,
				value: step.value,
			});
			await considerDelay();
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
				await considerDelay();
			}
			break;
		}
		case 'delete': {
			useQueueManagerStore
				.getState()
				.set({ list: 'webApi', type: 'delete', value: step.value });
			await considerDelay();
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
