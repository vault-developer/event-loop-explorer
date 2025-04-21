import { parse, Program } from 'acorn';

type GetAstFromText = (code: string) => Program;

export type AST = Program;

export const getAstFromText: GetAstFromText = (code) => {
	return parse(code, { ecmaVersion: 'latest' });
};
