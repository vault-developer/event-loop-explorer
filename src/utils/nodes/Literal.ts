import { Literal } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';

export class LiteralClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const literal = this.node as Literal;
		return `${literal.value}`;
	};

	traverse = () => {};
}
