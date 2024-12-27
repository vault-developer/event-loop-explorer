import { ELSerialisedStep } from './utils/calculator/calculator.types.ts';

export const simulate = (steps: Record<number, ELSerialisedStep[]>) => {
	console.log('simulation start for steps', steps);

	let time = 0;

	const animate = async () => {
		console.log('time', time);
		time++;
		// TODO: manage every step
		if (time > 100) return;
		requestAnimationFrame(animate);
	};

	animate();
};
