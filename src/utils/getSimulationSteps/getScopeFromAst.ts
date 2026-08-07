import { type Program } from 'acorn';
import * as eslintScope from 'eslint-scope';
import type { Program as EstreeProgram } from 'estree';

export const getScopeFromAst = (ast: Program) => {
	return eslintScope.analyze(ast as unknown as EstreeProgram, {
		ecmaVersion: 2024,
		sourceType: 'script',
	});
};
