import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-textmate';
import { RefObject, useEffect, useRef } from 'react';
import {
	useEditorStore,
	useSimulatorStore,
	useThemeStore,
} from 'store/store.ts';
import * as Styled from './Editor.styled.ts';

export default function Editor({
	text,
	setText,
}: {
	text: string;
	setText: (key: string) => void;
}) {
	const status = useSimulatorStore((state) => state.status);
	const setEditorRef = useEditorStore((state) => state.setRef);
	const editorRef = useRef<AceEditor>(null);
	const isDark = useThemeStore((state) => state.isDark);
	const theme = isDark ? 'solarized_dark' : 'textmate';

	useEffect(() => {
		if (editorRef.current) {
			setEditorRef(editorRef as RefObject<AceEditor>);
		}
	}, [editorRef, setEditorRef]);

	return (
		<Styled.EditorWrapper>
			<AceEditor
				ref={editorRef}
				width={'100%'}
				value={text}
				height={'100%'}
				mode="javascript"
				theme={theme}
				setOptions={{
					useWorker: false,
					readOnly: status !== 'idle',
				}}
				showPrintMargin={false}
				fontSize={14}
				onChange={setText}
			/>
		</Styled.EditorWrapper>
	);
}
