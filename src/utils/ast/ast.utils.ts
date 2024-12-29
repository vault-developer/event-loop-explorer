import { CallExpression } from 'acorn';
import {
	isCallExpression,
	isIdentifier,
	isMemberExpression,
} from './ast.guards.ts';

export function isConsoleExpression(expression: CallExpression): boolean {
	const callee = expression.callee;
	return (
		isMemberExpression(callee) &&
		isIdentifier(callee.object) &&
		isIdentifier(callee.property) &&
		callee.object.name === 'console' &&
		['log', 'info', 'error', 'warn'].includes(callee.property.name)
	);
}

export function isSetTimeoutExpression(expression: CallExpression): boolean {
	const callee = expression.callee;
	return isIdentifier(callee) && callee.name === 'setTimeout';
}

export function isQueueMicrotaskExpression(
	expression: CallExpression
): boolean {
	const callee = expression.callee;
	return isIdentifier(callee) && callee.name === 'queueMicrotask';
}

export function isRequestAnimationFrameExpression(
	expression: CallExpression
): boolean {
	const callee = expression.callee;
	return isIdentifier(callee) && callee.name === 'requestAnimationFrame';
}

export function isPromiseCallbackExpression(
	expression: CallExpression
): boolean {
	const callee = expression.callee;
	return (
		isMemberExpression(callee) &&
		isIdentifier(callee.property) &&
		callee.property.name === 'then' &&
		isCallExpression(callee.object) &&
		isMemberExpression(callee.object.callee) &&
		isIdentifier(callee.object.callee.object) &&
		callee.object.callee.object.name === 'Promise' &&
		isIdentifier(callee.object.callee.property) &&
		callee.object.callee.property.name === 'resolve'
	);
}
