import AceEditorImport from 'react-ace';

export const AceEditor =
	typeof AceEditorImport === 'function'
		? AceEditorImport
		: (
				AceEditorImport as unknown as {
					default: typeof AceEditorImport;
				}
			).default;

export type AceEditorComponent = typeof AceEditor;
export type AceEditorInstance = InstanceType<AceEditorComponent>;
