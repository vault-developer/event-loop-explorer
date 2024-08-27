import { Program } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
import { nodeFactory } from './factory.ts';

export class ProgramClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const program = this.node as Program;
		return `${program.sourceType}`;
	};

	traverse = () => {
		const program = this.node as Program;

		for (const acornNode of program.body) {
			const node = nodeFactory({ node: acornNode, context: this.context });
			node.traverse();
		}
	};
}
