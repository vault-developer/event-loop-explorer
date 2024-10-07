import { VariableDeclaration, Identifier } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
// import { nodeFactory } from './factory.ts';

export class VariableDeclarationClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		console.log(
			'Serialize method is not implemented for the Variable declarations'
		);
		return '';
	};

	traverse = () => {
		const variableDeclaration = this.node as VariableDeclaration;
		this.context.variables[
			(variableDeclaration.declarations[0].id as Identifier).name
		] = variableDeclaration;
	};
}
