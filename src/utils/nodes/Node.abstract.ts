import { Node as AcornNode } from 'acorn';
import { AcornArguments, ParseContextInterface } from '../parse.types.ts';

export type NodeClassParams = Record<string, AcornNode | undefined>;

export interface NodeClassConstructor {
	node: AcornNode;
	context: ParseContextInterface;
	args?: AcornArguments;
	params?: NodeClassParams;
}

export abstract class NodeClass {
	constructor({ node, context, args, params }: NodeClassConstructor) {
		this.node = node;
		this.context = context;
		this.args = args;
		this.params = params;
	}

	node: AcornNode;
	context: ParseContextInterface;
	args?: AcornArguments;
	params?: NodeClassParams;
	abstract serialize: () => string;
	abstract traverse: () => void;
}
