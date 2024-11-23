import { NodeClass, NodeClassConstructor } from './Node.abstract';

export class BinaryExpressionClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const binaryExpression = this.node as any;
		const left = binaryExpression.left.value;
		const right = binaryExpression.right.value;
		const operator = binaryExpression.operator;
		switch (operator) {
			case '+':
				return left + right;
			case '-':
				return left - right;
			case '/':
				return left / right;
			case '*':
				return left * right;
			case '%':
				return left % right;
			default:
				return 'operator not supported';
		}
	};

	traverse = () => {};
}
