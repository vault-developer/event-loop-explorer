/* eslint-disable @typescript-eslint/no-explicit-any */
import {CallExpression, Identifier, Literal, MemberExpression, ArrowFunctionExpression} from 'acorn';

export function isMemberExpression(node: any): node is MemberExpression {
	return node?.type === 'MemberExpression';
}
export function isIdentifier(node: any): node is Identifier {
	return node?.type === 'Identifier';
}
export function isCallExpression(node: any): node is CallExpression {
	return node?.type === 'CallExpression';
}
export function isLiteral(node: any): node is Literal {
	return node?.type === 'Literal';
}
export function isArrowFunctionExpression(node: any): node is ArrowFunctionExpression {
	return node?.type === 'ArrowFunctionExpression';
}
