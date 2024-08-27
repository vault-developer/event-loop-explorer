import { parse as acornParse } from 'acorn';
import { ParseContextInterface } from './parse.types.ts';
import { nodeFactory } from './nodes/factory.ts';
import { NodeClass } from './nodes/Node.abstract.ts';

export const parse = (code: string): NodeClass => {
	const context: ParseContextInterface = {
		actions: [],
		functions: {},
	};
	const parsed = acornParse(code, { ecmaVersion: 2020 });
	return nodeFactory({ node: parsed, context });
};
