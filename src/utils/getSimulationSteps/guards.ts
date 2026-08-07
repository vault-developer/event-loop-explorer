import {
	CallExpression,
	Identifier,
	SpreadElement,
	Literal,
	MemberExpression,
	ArrowFunctionExpression,
	FunctionDeclaration,
	Program,
	BlockStatement,
	ExpressionStatement,
} from 'acorn';

export function isMemberExpression(node: unknown): node is MemberExpression {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'MemberExpression'
	);
}

export function isIdentifier(node: unknown): node is Identifier {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'Identifier'
	);
}

export function isCallExpression(node: unknown): node is CallExpression {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'CallExpression'
	);
}

export function isBlockStatement(node: unknown): node is BlockStatement {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'BlockStatement'
	);
}

export function isExpressionStatement(
	node: unknown
): node is ExpressionStatement {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'ExpressionStatement'
	);
}

export function isFunctionDeclaration(
	node: unknown
): node is FunctionDeclaration {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'FunctionDeclaration'
	);
}

export function isLiteral(node: unknown): node is Literal {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'Literal'
	);
}

export function isArrowFunctionExpression(
	node: unknown
): node is ArrowFunctionExpression {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'ArrowFunctionExpression'
	);
}

export function isProgram(node: unknown): node is Program {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'Program'
	);
}

export function isSpreadElement(node: unknown): node is SpreadElement {
	return (
		typeof node === 'object' &&
		node !== null &&
		(node as { type?: string }).type === 'SpreadElement'
	);
}
