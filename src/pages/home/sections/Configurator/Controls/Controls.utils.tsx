import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import { codeExamples } from '../Configurator.data.tsx';

export const getCodeExampleByTitle = codeExamples.reduce(
	(acc, { title, code }) => {
		acc[title] = code;
		return acc;
	},
	{} as Record<string, string>
);
