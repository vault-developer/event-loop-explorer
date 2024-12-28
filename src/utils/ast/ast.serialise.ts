import { ELSerialisedStep, ELStep } from '../calculator/calculator.types.ts';
import { Node } from 'acorn';
import { ScopeManager } from 'eslint-scope';
import {
	isArrowFunctionExpression,
	isBlockStatement,
	isCallExpression,
	isExpressionStatement,
	isIdentifier,
	isLiteral,
	isMemberExpression,
	isProgram,
	isSpreadElement,
} from './ast.guards.ts';

export const getSerialisedSteps = (
	steps: ELStep[],
	scope: ScopeManager
): ELSerialisedStep[] => {
	return steps.map((step) => {
		if (!('ast' in step)) return step;
		return {
			...step,
			value: serialiseNode(step.ast, scope),
		};
	});
};

const serialiseNode = (node: Node, scope: ScopeManager): string => {
	if (isProgram(node)) return node.sourceType;
	if (isLiteral(node)) return String(node.value);
	if (isIdentifier(node)) return node.name;
	if (isCallExpression(node)) {
		const args = node.arguments
			.map((arg) => {
				if (isSpreadElement(arg))
					throw new Error('SpreadElement as argument type is not implemented');
				return serialiseNode(arg, scope);
			})
			.join(',');
		const callee = serialiseNode(node.callee, scope);
		return `${callee}(${args})`;
	}
	if (isMemberExpression(node)) {
		const object = serialiseNode(node.object, scope);
		const property = serialiseNode(node.property, scope);
		return `${object}.${property}`;
	}
	if (isExpressionStatement(node)) {
		return serialiseNode(node.expression, scope);
	}
	if (isBlockStatement(node)) {
		const body = node.body.map((node) => serialiseNode(node, scope)).join('\n');
		return `{${body}}`;
	}
	if (isArrowFunctionExpression(node)) {
		const params = node.params
			.map((param) => serialiseNode(param, scope))
			.join(',');
		const body = serialiseNode(node.body, scope);
		return `(${params})=>${body}`;
	}

	throw new Error(
		`Serialisation for node type ${node.type} is not implemented`
	);
};
