import { AssignmentExpression, Identifier } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';

export class AssignmentExpressionClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		console.log(
			'Serialize method is not implemented for the Assignment expressions'
		);
		return '';
	};

	traverse = () => {
		const assignmentExpression = this.node as AssignmentExpression;
		this.context.variables[(assignmentExpression.left as Identifier).name] =
			assignmentExpression.right;
	};
}
