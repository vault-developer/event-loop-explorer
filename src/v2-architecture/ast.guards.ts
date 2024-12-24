import { CallExpression, MemberExpression } from 'acorn';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMemberExpression(node: any): node is MemberExpression {
	return node?.type === 'MemberExpression';
}

export function isConsoleMethodCall(expression: MemberExpression): boolean {
	return (
		expression.object.type === 'Identifier' &&
		expression.object.name === 'console' &&
		expression.property.type === 'Identifier' &&
		['log', 'info', 'error', 'warn'].includes(expression.property.name)
	);
}

export function isPromiseCallback(expression: MemberExpression): boolean {
	if (expression.object.type !== 'CallExpression') return false;
	const innerCallExpression = expression.object as CallExpression;
	if (innerCallExpression.callee.type !== 'MemberExpression') return false;
	const innerMemberExpression = innerCallExpression.callee as MemberExpression;

	return (
		innerMemberExpression.object.type === 'Identifier' &&
		innerMemberExpression.object.name === 'Promise' &&
		innerMemberExpression.property.type === 'Identifier' &&
		innerMemberExpression.property.name === 'resolve' &&
		expression.property.type === 'Identifier' &&
		expression.property.name === 'then'
	);
}
