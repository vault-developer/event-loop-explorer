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
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import { useState } from 'react';
import {
	useEditor,
	useEventLists,
	useEventLoopAnimation,
	useSpeedFactor,
} from '../../../../../store/store.ts';
import { parse } from '../../../../../utils/parse.ts';
import { codeExamples } from '../Configurator.data.tsx';
import * as Styled from './Controls.styled.ts';
import { getCodeExampleByTitle } from './Controls.utils.tsx';

export default function Controls({
	text,
	setText,
}: {
	text: string;
	setText: (key: string) => void;
}) {
	const eventListsStateSet = useEventLists((state) => state.set);
	const eventListsStateClear = useEventLists((state) => state.clear);
	const clearAnimationState = useEventLoopAnimation((state) => state.clear);
	const setAnimationState = useEventLoopAnimation((state) => state.setState);
	const status = useEventLoopAnimation((state) => state.status);
	const [exampleTitle, setExampleTitle] = useState(codeExamples[3].title);
	const speedFactorState = useSpeedFactor((state) => state);
	const setSourceCode = useEditor((state) => state.setSource);
	const clearEditor = useEditor((state) => state.clearEditor);

	const onExampleSelect = (e: SelectChangeEvent) => {
		const example = e.target.value;
		const code = getCodeExampleByTitle[example];
		setText(code);
		setExampleTitle(example);
	};

	const onStop = () => {
		clearAnimationState();
		eventListsStateClear();
		clearEditor();
	};

	const onPause = () => {
		setAnimationState('paused', 'status');
	};

	const onResume = () => {
		setAnimationState('running', 'status');
	};

	const onRun = () => {
		clearAnimationState();
		eventListsStateClear();
		const script = parse(text);
		setSourceCode(text);
		eventListsStateSet({
			list: 'task_queue',
			type: 'push',
			value: script,
		});
		setAnimationState('running', 'status');
	};

	const onSpeedChange = (_: Event, value: number | number[]) => {
		const num = Array.isArray(value) ? value[0] : value;
		const res = num >= 0 ? num + 1 : 1 / (1 - num);
		speedFactorState.setSpeed(res);
	};

	const speed =
		speedFactorState.speed >= 1
			? speedFactorState.speed - 1
			: 1 - 1 / speedFactorState.speed;

	return (
		<Styled.ControlsWrapper>
			{status === 'disabled' && (
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
			{status !== 'disabled' && (
				<>
					<Styled.SliderWrapper>
						<div id="non-linear-slider" data-testid="speed-slider">
							speed: {Math.round(speedFactorState.speed * 100)}%
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
