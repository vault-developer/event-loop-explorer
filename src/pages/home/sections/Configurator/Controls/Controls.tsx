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
import {
	useQueueManagerStore,
	useSimulatorStore,
	useWheelStore,
	useEditorStore,
} from 'store/store.ts';
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
	const setEditorSource = useEditorStore((state) => state.setSource);

	const clearWheel = useWheelStore((state) => state.clear);
	const clearQueueManager = useQueueManagerStore((state) => state.clear);
	const clearSimulator = useSimulatorStore((state) => state.clear);
	const clearEditor = useEditorStore((state) => state.clearEditor);

	const onExampleSelect = (e: SelectChangeEvent) => {
		const example = e.target.value;
		const code = getCodeExampleByTitle[example];
		setText(code);
		setExampleTitle(example);
	};

	const onClear = () => {
		clearWheel();
		clearQueueManager();
		clearSimulator();
		clearEditor();
	};

	const onStop = () => {
		setStatus('idle');
		onClear();
	};

	const onPause = () => setStatus('paused');

	const onResume = () => setStatus('running');

	const onRun = () => {
		onClear();
		setEditorSource(text);
		setStatus('running');
		start(text, () => setStatus('idle'));
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	};

	const onSpeedChange = (_: Event, value: number | number[]) => {
		const num = Array.isArray(value) ? value[0] : value;
		simulatorStore.setSpeed(Math.pow(2, num));
	};

	const speed = Math.log2(simulatorStore.speed);

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
							speed: x{simulatorStore.speed}
						</div>
						<Slider
							aria-labelledby="non-linear-slider"
							aria-label="Speed"
							shiftStep={1}
							value={speed}
							onChange={onSpeedChange}
							step={1}
							marks
							min={-2}
							max={2}
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
