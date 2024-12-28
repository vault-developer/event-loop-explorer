import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Slider,
} from '@mui/material';
import { useState } from 'react';
import {useQueueManagerStore, useSimulatorStore, useWheelStore} from 'store/store.ts';
import { codeExamples } from '../Configurator.data.tsx';
import * as Styled from './Controls.styled.ts';
import { getCodeExampleByTitle } from './Controls.utils.tsx';
import { start } from 'utils/start.ts';

export default function Controls({
	text,
	setText,
}: {
	text: string;
	setText: (key: string) => void;
}) {
	const status = useSimulatorStore((state) => state.status);
	const setStatus = useSimulatorStore((state) => state.setStatus);
	const [exampleTitle, setExampleTitle] = useState(codeExamples[3].title);
	const simulatorStore = useSimulatorStore((state) => state);

	const clearWheel = useWheelStore((state) => state.clear);
	const clearQueueManager = useQueueManagerStore((state) => state.clear);
	const clearSimulator = useSimulatorStore((state) => state.clear);

	const onExampleSelect = (e: SelectChangeEvent) => {
		const example = e.target.value;
		const code = getCodeExampleByTitle[example];
		setText(code);
		setExampleTitle(example);
	};

	const onStop = () => {
		setStatus('idle');
		clearWheel();
		clearQueueManager();
		clearSimulator();
	};

	const onPause = () => setStatus('paused');

	const onResume = () => setStatus('running');

	const onRun = () => {
		setStatus('running');
		start(text, onStop);
	};

	const onSpeedChange = (_: Event, value: number | number[]) => {
		const num = Array.isArray(value) ? value[0] : value;
		const res = num >= 0 ? num + 1 : 1 / (1 - num);
		simulatorStore.setSpeed(res);
	};

	const speed =
		simulatorStore.speed >= 1
			? simulatorStore.speed - 1
			: 1 - 1 / simulatorStore.speed;

	return (
		<Styled.ControlsWrapper>
			{status === 'idle' && (
				<>
					<Styled.SelectWrapper>
						<FormControl>
							<InputLabel id="select-label">example:</InputLabel>
							<Select
								size="small"
								labelId="select-label"
								label="example"
								value={exampleTitle}
								onChange={onExampleSelect}
								style={{ minWidth: 200, textAlign: 'start' }}
								variant="outlined"
								data-testid="example-select"
							>
								{codeExamples.map(({ title }) => (
									<MenuItem
										value={title}
										key={title}
										data-testid="example-menu-item"
									>
										{title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Styled.SelectWrapper>
					<Styled.CTAButton
						variant="contained"
						onClick={onRun}
						data-testid="run-button"
					>
						<PlayArrowIcon />
						run
					</Styled.CTAButton>
				</>
			)}
			{status !== 'idle' && (
				<>
					<Styled.SliderWrapper>
						<div id="non-linear-slider" data-testid="speed-slider">
							speed: {Math.round(simulatorStore.speed * 100)}%
						</div>
						<Slider
							aria-labelledby="non-linear-slider"
							aria-label="Speed"
							defaultValue={speed}
							shiftStep={1}
							onChange={onSpeedChange}
							step={1}
							marks
							min={-3}
							max={3}
						/>
					</Styled.SliderWrapper>
					<Styled.ButtonsWrapper>
						<Styled.CTAButton variant="contained" onClick={onStop}>
							<StopIcon />
							stop
						</Styled.CTAButton>

						{status === 'paused' && (
							<Styled.CTAButton variant="contained" onClick={onResume}>
								<PlayArrowIcon />
								resume
							</Styled.CTAButton>
						)}

						{status === 'running' && (
							<Styled.CTAButton variant="contained" onClick={onPause}>
								<PauseIcon />
								pause
							</Styled.CTAButton>
						)}
					</Styled.ButtonsWrapper>
				</>
			)}
		</Styled.ControlsWrapper>
	);
}
