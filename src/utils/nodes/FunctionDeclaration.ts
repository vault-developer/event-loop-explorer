import { FunctionDeclaration } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';

export class FunctionDeclarationClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		console.log(
			'Serialize method is not implemented for the Function declarations'
		);
		return '';
	};

	traverse = () => {
		const functionDeclaration = this.node as FunctionDeclaration;
		this.context.functions[functionDeclaration.id.name] = functionDeclaration;
	};
}
