import { ELSerialisedStep } from './calculator/calculator.types.ts';
import {useSimulatorStore, useWheelStore} from "store/store.ts";

export const simulate = (steps: ELSerialisedStep[]) => {
	const groupedSteps = steps.reduce(
		(acc: Record<string, ELSerialisedStep[]>, item: ELSerialisedStep) => {
			if (!acc[item.time]) {
				acc[item.time] = [];
			}
			acc[item.time].push(item);
			return acc;
		}, {});


	console.log('simulation start for steps', groupedSteps);

	const animate = async () => {
		const time = useSimulatorStore.getState().time + 1;
		const grad = time % 360;

		useSimulatorStore.getState().setTime(time);
		useWheelStore.getState().setGrad(grad);

		console.log('time', time);

		if (groupedSteps[time]) {
			console.log('handle these step:', steps[time]);
		}

		if (time > 500) return;
		requestAnimationFrame(animate);
	};

	animate();
};
