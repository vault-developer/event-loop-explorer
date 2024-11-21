import { NodeClass, NodeClassConstructor } from './Node.abstract';

export class BinaryExpressionClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const left = this.node.left.value;
		const operator = this.node.operator;
		const right = this.node.right.value;
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
