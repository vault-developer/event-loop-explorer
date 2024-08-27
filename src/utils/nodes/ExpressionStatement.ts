import { ExpressionStatement } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
import { nodeFactory } from './factory.ts';

export class ExpressionStatementClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const expression = this.node as ExpressionStatement;
		return nodeFactory({
			node: expression.expression,
			context: this.context,
			args: this.args,
			params: this.params,
		}).serialize();
	};

	traverse = () => {
		const node = this.node as ExpressionStatement;
		const expression = nodeFactory({
			node: node.expression,
			context: this.context,
			args: this.args,
			params: this.params,
		});
		expression.traverse();
	};
}
