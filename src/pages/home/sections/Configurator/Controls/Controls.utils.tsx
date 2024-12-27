import { codeExamples } from '../Configurator.data.tsx';

export const getCodeExampleByTitle = codeExamples.reduce(
	(acc, { title, code }) => {
		acc[title] = code;
		return acc;
	},
	{} as Record<string, string>
);
