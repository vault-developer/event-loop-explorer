import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import { useEffect, useRef } from 'react';
import { useEditorStore, useSimulatorStore } from 'store/store.ts';
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

	useEffect(() => {
		if (editorRef.current) {
			setEditorRef(editorRef);
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
				theme="solarized_dark"
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
