import {Expression, FunctionDeclaration, SpreadElement} from "acorn";
import {ActionInterface} from "../store/store.types.ts";



export interface ParseContextInterface {
  actions: ActionInterface[];
  functions: Record<string, FunctionDeclaration>;
}

export type AcornArgument = Expression | SpreadElement;
export type AcornArguments = AcornArgument[];