import { type FC, type RefObject, useEffect, useRef } from 'react';
import { AceEditor, type AceEditorInstance } from '@/utils/aceEditor';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-github';
import { useControlsStore, useEditorStore } from '@/store/store';
import { useTheme } from '@/theme';

interface EditorProps {
	code: string;
	setCode: (key: string) => void;
}

export const Editor: FC<EditorProps> = ({ code, setCode }) => {
	const { themeDefinition } = useTheme();
	const editorRef = useRef<AceEditorInstance>(null);
	const setEditorRef = useEditorStore((state) => state.setRef);
	const status = useControlsStore((state) => state.status);
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
			theme={themeDefinition.aceTheme}
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
