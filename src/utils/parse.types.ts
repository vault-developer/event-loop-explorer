import {
	Expression,
	FunctionDeclaration,
	SpreadElement,
	VariableDeclaration,
} from 'acorn';
import { ActionInterface } from '../store/store.types.ts';

export interface ParseContextInterface {
	actions: ActionInterface[];
	functions: Record<string, FunctionDeclaration>;
	variables: Record<string, VariableDeclaration>;
}

export type AcornArgument = Expression | SpreadElement;
export type AcornArguments = AcornArgument[];
