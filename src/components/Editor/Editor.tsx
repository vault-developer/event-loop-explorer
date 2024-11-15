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
import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import {
	useEditor,
	useEventLists,
	useEventLoopAnimation,
	useSpeedFactor,
} from '../../store/store.ts';
import { isMobile } from '../../utils/isMobile.ts';
import { parse } from '../../utils/parse.ts';
import { codeExamples } from './Editor.data.tsx';
import * as Styled from './Editor.styled.ts';

const codeByTitle = codeExamples.reduce(
	(acc, { title, code }) => {
		acc[title] = code;
		return acc;
	},
	{} as Record<string, string>
);

function EditorComponent() {
	const [text, setText] = useState(codeExamples[3].code);
	const eventListsStateSet = useEventLists((state) => state.set);
	const eventListsStateClear = useEventLists((state) => state.clear);
	const clearAnimationState = useEventLoopAnimation((state) => state.clear);
	const setAnimationState = useEventLoopAnimation((state) => state.setState);
	const status = useEventLoopAnimation((state) => state.status);
	const [example, setExample] = useState(codeExamples[3].title);
	const speedFactorState = useSpeedFactor((state) => state);
	const setEditorRef = useEditor((state) => state.setRef);
	const setSourceCode = useEditor((state) => state.setSource);
	const clearEditor = useEditor((state) => state.clearEditor);
	const editorRef = useRef<AceEditor>(null);

	const onSelect = (e: SelectChangeEvent) => {
		const example = e.target.value;
		const code = codeByTitle[example];
		setText(code);
		setExample(example);
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

	useEffect(() => {
		if (editorRef.current) {
			setEditorRef(editorRef);
		}
	}, []);

	useEffect(() => {
		if (
			isMobile() &&
			status === 'running' &&
			document.getElementById('eventLoop')
		) {
			document.getElementById('eventLoop')?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [status]);

	return (
		<Styled.SectionWrapper>
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
									value={example}
									onChange={onSelect}
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
			<Styled.EditorWrapper>
				<AceEditor
					ref={editorRef}
					width={'100%'}
					value={text}
					height={'100%'}
					mode="javascript"
					theme="solarized_dark"
					setOptions={{
						useWorker: false,
						readOnly: status !== 'disabled',
					}}
					showPrintMargin={false}
					fontSize={14}
					onChange={setText}
				/>
			</Styled.EditorWrapper>
		</Styled.SectionWrapper>
	);
}

export default EditorComponent;
