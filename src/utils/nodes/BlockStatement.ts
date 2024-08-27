import { BlockStatement } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
import { nodeFactory } from './factory.ts';

export class BlockStatementClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const blockStatement = this.node as BlockStatement;
		const statements = blockStatement.body
			.map((node) =>
				nodeFactory({
					node,
					context: this.context,
					params: this.params,
					args: this.args,
				}).serialize()
			)
			.join('\n');
		return `{${statements}}`;
	};

	traverse = () => {
		const blockStatement = this.node as BlockStatement;
		blockStatement.body.map((node) =>
			nodeFactory({
				node,
				context: this.context,
				params: this.params,
				args: this.args,
			}).traverse()
		);
	};
}
