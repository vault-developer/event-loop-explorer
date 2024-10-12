import { CallExpression, MemberExpression } from 'acorn';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
import { nodeFactory } from './factory.ts';

export class MemberExpressionClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	serialize = () => {
		const expression = this.node as MemberExpression;

		const object = nodeFactory({
			node: expression.object,
			context: this.context,
			args: this.args,
			params: this.params,
		}).serialize();

		const property = nodeFactory({
			node: expression.property,
			context: this.context,
			args: this.args,
			params: this.params,
		}).serialize();

		return `${object}.${property}`;
	};

	traverse = () => {
		const memberExpression = this.node as MemberExpression;

		// handle console
		if (
			memberExpression.object.type === 'Identifier' &&
			memberExpression.object.name === 'console'
		) {
			return this.context.actions.push({
				list: 'console',
				type: 'push',
				value:
					this.args
						?.map((arg) => {
							if (arg.type === 'Identifier') {
								const variableValue = this.context.variables[arg.name];
								if (!variableValue) return 'undefined';
								const literal = nodeFactory({
									node: variableValue,
									context: this.context,
								}).serialize();
								return literal;
							} else {
								return nodeFactory({
									node: arg,
									context: this.context,
									params: this.params,
								}).serialize();
							}
						})
						.join(',') ?? '',
			});
		}

		// handle promise.resolve().then()
		if (
			memberExpression.object.type === 'CallExpression' &&
			memberExpression.property.type === 'Identifier' &&
			memberExpression.property.name === 'then'
		) {
			const callExpression = memberExpression.object as CallExpression;
			if (callExpression.callee.type === 'MemberExpression') {
				const innerMemberExpression = callExpression.callee;
				if (
					innerMemberExpression.object.type === 'Identifier' &&
					innerMemberExpression.object.name === 'Promise'
				) {
					if (
						innerMemberExpression.property.type === 'Identifier' &&
						innerMemberExpression.property.name === 'resolve'
					) {
						return this.context.actions.push({
							list: 'microtask_queue',
							type: 'push',
							value:
								this.args &&
								nodeFactory({
									node: this.args[0],
									context: this.context,
									params: this.params,
									args: this.args,
								}),
						});
					}
				}
			}
		}

		return console.log(
			'Traverse:MemberExpression: not supported',
			memberExpression
		);
	};
}
