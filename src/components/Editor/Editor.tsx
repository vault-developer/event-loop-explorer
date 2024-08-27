import AceEditor from 'react-ace';
import { useState } from 'react';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import { codeExamples } from './Editor.data.tsx';
import { parse } from '../../utils/parse.ts';
import { useEventLists, useEventLoopAnimation } from '../../store/store.ts';
import Button from '@mui/material/Button';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import * as Styled from './Editor.styled.ts';

const codeByTitle = codeExamples.reduce(
	(acc, { title, code }) => {
		acc[title] = code;
		return acc;
	},
	{} as Record<string, string>
);

function EditorComponent() {
	const [text, setText] = useState(codeExamples[0].code);
	const eventListsStateSet = useEventLists((state) => state.set);
	const eventListsStateClear = useEventLists((state) => state.clear);
	const clearAnimationState = useEventLoopAnimation((state) => state.clear);
	const setAnimationState = useEventLoopAnimation((state) => state.setState);
	const enabled = useEventLoopAnimation((state) => state.enabled);
	const [example, setExample] = useState(codeExamples[0].title);

	const onSelect = (e: SelectChangeEvent) => {
		const example = e.target.value;
		const code = codeByTitle[example];
		onStop();
		setText(code);
		setExample(example);
	};

	const onStop = () => {
		clearAnimationState();
		eventListsStateClear();
	};

	const onRun = () => {
		clearAnimationState();
		eventListsStateClear();
		const script = parse(text);
		eventListsStateSet({
			list: 'task_queue',
			type: 'push',
			value: script,
		});
		setAnimationState(true, 'enabled');
	};

	return (
		<Styled.SectionWrapper>
			<Styled.ControlsWrapper>
				<Styled.SelectWrapper>
					<FormControl>
						<InputLabel
							id="select-label"
							sx={{
								'&.MuiInputLabel-root.Mui-focused': {
									color: 'gray',
								},
							}}
						>
							example:
						</InputLabel>
						<Select
							inputProps={{
								MenuProps: {
									MenuListProps: {
										sx: {
											backgroundColor: '#35495a',
										},
									},
								},
							}}
							sx={{
								'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
									{
										borderColor: 'gray',
									},
							}}
							size="small"
							labelId="select-label"
							label="example"
							value={example}
							onChange={onSelect}
							style={{ minWidth: 200, textAlign: 'start' }}
							variant="outlined"
						>
							{codeExamples.map(({ title }) => (
								<MenuItem value={title} key={title}>
									{title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Styled.SelectWrapper>

				{!enabled && (
					<Button variant="contained" onClick={onRun} style={{ minWidth: 120 }}>
						run code
					</Button>
				)}

				{enabled && (
					<Button
						variant="contained"
						style={{ minWidth: 120 }}
						onClick={onStop}
					>
						stop
					</Button>
				)}
			</Styled.ControlsWrapper>
			<Styled.EditorWrapper>
				<AceEditor
					width={'100%'}
					value={text}
					height={'100%'}
					mode="javascript"
					theme="solarized_dark"
					setOptions={{
						useWorker: false,
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
