import {CallExpression} from 'acorn';
import {isCallExpression, isIdentifier, isMemberExpression} from './ast.guards.ts';

export function isConsoleExpression(expression: CallExpression): boolean {
	const callee = expression.callee;
	if (isMemberExpression(callee) !== true) return false;
	const {object, property} = callee;
	if (isIdentifier(object) !== true) return false;
	if (isIdentifier(property) !== true) return false;

	return (
		object.name === 'console' &&
		['log', 'info', 'error', 'warn'].includes(property.name)
	);
}

export function isSetTimeoutExpression(expression: CallExpression): boolean {
	const callee = expression.callee;
	if (isIdentifier(callee) !== true) return false;

	return callee.name === 'setTimeout';
}

export function isPromiseCallbackExpression(expression: CallExpression): boolean {
	const callee = expression.callee;
	if (isMemberExpression(callee) !== true) return false;
	const {object: calleeCallExpression, property: calleeProperty} = callee;
	if (isCallExpression(calleeCallExpression) !== true) return false;
	if (isIdentifier(calleeProperty) !== true) return false;
	const innerCalleMemberExpression = calleeCallExpression.callee;
	if (isMemberExpression(innerCalleMemberExpression) !== true) return false;
	const {object , property } = innerCalleMemberExpression;
	if (isIdentifier(object) !== true) return false;
	if (isIdentifier(property) !== true) return false;

	return (
		object.name === 'Promise' &&
		property.name === 'resolve' &&
		calleeProperty.name === 'then'
	);
}
