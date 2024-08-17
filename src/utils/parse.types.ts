import {Expression, FunctionDeclaration, SpreadElement} from "acorn";
import {EventListNameType} from "../store/store.types.ts";

export interface ActionInterface {
  sector: EventListNameType;
  action: 'push' | 'pop' | 'shift';
  value?: string | object;
}

export interface ParseContextInterface {
  actions: ActionInterface[];
  functions: Record<string, FunctionDeclaration>;
}

export type AcornArgument = Expression | SpreadElement;
export type AcornArguments = AcornArgument[];