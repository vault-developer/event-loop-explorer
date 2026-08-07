import { type FC, type RefObject, useEffect, useRef } from 'react';
import { AceEditor, type AceEditorInstance } from '@/utils/aceEditor';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-textmate';
import { useControlsStore, useEditorStore } from '@/store/store';
import { useTheme } from '@/theme';

interface EditorProps {
	code: string;
	setCode: (key: string) => void;
}

export const Editor: FC<EditorProps> = ({ code, setCode }) => {
	const { theme } = useTheme();
	const editorRef = useRef<AceEditorInstance>(null);
	const setEditorRef = useEditorStore((state) => state.setRef);
	const status = useControlsStore((state) => state.status);
	const textTheme = theme === 'light' ? 'textmate' : 'solarized_dark';
	const readOnly = status !== 'idle';

	useEffect(() => {
		if (editorRef.current) {
			setEditorRef(editorRef as RefObject<AceEditorInstance>);
		}
	}, [editorRef, setEditorRef]);

	return (
		<AceEditor
			ref={editorRef}
			width={'100%'}
			value={code}
			height={'100%'}
			mode="javascript"
			theme={textTheme}
			setOptions={{
				useWorker: false,
				readOnly: readOnly,
				showGutter: false,
			}}
			showPrintMargin={false}
			lineHeight={18}
			fontSize={14}
			onChange={setCode}
		/>
	);
};
