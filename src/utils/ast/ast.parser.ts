import { parse, Program } from 'acorn';

type AstParser = (code: string) => Program;

export type AST = Program;

export const getAstFromText: AstParser = (code) => {
	return parse(code, { ecmaVersion: 'latest' });
};
