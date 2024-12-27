import { Node } from 'acorn';
import * as eslintScope from 'eslint-scope';

export const getAstScope = (ast: Node) => {
	return eslintScope.analyze(ast, {
		ecmaVersion: 2024,
		sourceType: 'script',
	});
};
