import { FC } from 'react';
import { ControlsUi } from './controls.ui';
import {
	useControlsStore,
	useEditorStore,
	useQueueManagerStore,
	useWheelStore,
} from '@/store/store';
import { EXAMPLES } from '@/app/(main)/sections/configurator/controls.data';
import { getSimulationSteps } from '@/utils/getSimulationSteps/getSimulationSteps';
import { simulate } from '@/utils/simulate/simulate';

interface ControlsProps {
	code: string;
	setCode: (key: string) => void;
}

export const Controls: FC<ControlsProps> = ({ setCode, code }) => {
	const {
		status,
		setStatus,
		speed,
		setSpeed,
		clear: clearControls,
	} = useControlsStore();
	const clearWheel = useWheelStore((state) => state.clear);
	const clearQueueManager = useQueueManagerStore((state) => state.clear);
	const setEditorSource = useEditorStore((state) => state.setSource);

	const serialisedSpeed = Math.log2(speed);

	const onClear = () => {
		clearQueueManager();
		clearControls();
		clearWheel();
	};
	const onSerialisedSpeedChange = (value: number[]) =>
		setSpeed(Math.pow(2, value[0]));
	const onPlay = () => {
		onClear();
		const steps = getSimulationSteps(code);
		setEditorSource(code);
		setStatus('running');
		simulate(steps, onFinish);
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	};
	const onResume = () => setStatus('running');
	const onPause = () => setStatus('paused');
	const onFinish = () => setStatus('idle');
	const onStop = () => {
		onFinish();
		onClear();
	};
	const onExampleSelect = (key: string) => setCode(EXAMPLES[key].code);

	return (
		<ControlsUi
			status={status}
			speed={speed}
			serialisedSpeed={serialisedSpeed}
			onResume={onResume}
			onPause={onPause}
			onPlay={onPlay}
			onStop={onStop}
			onExampleSelect={onExampleSelect}
			onSerialisedSpeedChange={onSerialisedSpeedChange}
		/>
	);
};
