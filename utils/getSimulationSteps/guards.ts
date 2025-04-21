/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function isMemberExpression(node: any): node is MemberExpression {
	return node?.type === 'MemberExpression';
}

export function isIdentifier(node: any): node is Identifier {
	return node?.type === 'Identifier';
}

export function isCallExpression(node: any): node is CallExpression {
	return node?.type === 'CallExpression';
}

export function isBlockStatement(node: any): node is BlockStatement {
	return node?.type === 'BlockStatement';
}

export function isExpressionStatement(node: any): node is ExpressionStatement {
	return node?.type === 'ExpressionStatement';
}

export function isFunctionDeclaration(node: any): node is FunctionDeclaration {
	return node?.type === 'FunctionDeclaration';
}

export function isLiteral(node: any): node is Literal {
	return node?.type === 'Literal';
}

export function isArrowFunctionExpression(
	node: any
): node is ArrowFunctionExpression {
	return node?.type === 'ArrowFunctionExpression';
}

export function isProgram(node: any): node is Program {
	return node?.type === 'Program';
}

export function isSpreadElement(node: any): node is SpreadElement {
	return node?.type === 'SpreadElement';
}
