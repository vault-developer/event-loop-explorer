import * as acornWalk from 'acorn-walk';
import {
	isConsoleExpression,
	isPromiseCallbackExpression,
	isQueueMicrotaskExpression,
	isRequestAnimationFrameExpression,
	isSetTimeoutExpression,
} from './ast.utils.ts';
import { ELStep, WebApiTask } from '../calculator/calculator.types.ts';
import { Node } from 'acorn';
import {
	isFunctionDeclaration,
	isIdentifier,
	isLiteral,
} from './ast.guards.ts';
import { ScopeManager } from 'eslint-scope';
import { Queue } from '../../types.ts';

const traverseChildren = (
	node: Node,
	state: object,
	c: acornWalk.WalkerCallback<object>
) => {
	// Traverse the children of the node
	for (const key in node) {
		if (Object.prototype.hasOwnProperty.call(node, key)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const child = node[key];
			if (Array.isArray(child)) {
				// Traverse all array children
				child.forEach((subNode) => {
					if (subNode && typeof subNode === 'object') {
						c(subNode, state); // Recursively visit the child node
					}
				});
			} else if (child && typeof child === 'object') {
				// Visit individual child
				c(child, state);
			}
		}
	}
};

export const astTraverse = ({
	ast,
	logger,
	addToQueue,
	time,
	webApi,
	scope,
}: {
	ast: Node;
	logger: (step: ELStep) => void;
	addToQueue: ({ type, ast }: { type: Queue; ast: Node }) => void;
	time: number;
	webApi: WebApiTask[];
	scope: ScopeManager;
}) => {
	acornWalk.recursive(
		ast,
		{},
		{
			CallExpression(callExpression, state, c) {
				// pre-traversal
				logger({ time, type: 'push', queue: 'callstack', ast: callExpression });
				if (isConsoleExpression(callExpression)) {
					// console.log, console.error, console.warn, console.info
					if (callExpression.arguments.length > 1)
						throw new Error('Unsupported console argument');
					logger({
						time,
						type: 'push',
						queue: 'console',
						ast: callExpression.arguments[0],
					});
				} else if (isPromiseCallbackExpression(callExpression)) {
					// promise.resolve.then()
					addToQueue({ type: 'microtask', ast: callExpression.arguments[0] });
				} else if (isSetTimeoutExpression(callExpression)) {
					// setTimeout()
					const literal = callExpression.arguments[1];
					if (!isLiteral(literal))
						throw new Error('Unsupported setTimeout argument');
					if (typeof literal.value !== 'number')
						throw new Error('Unsupported setTimeout argument');
					const endTime = time + literal.value;
					webApi.push({ node: callExpression, endTime });
					// TODO: make ordering more efficient O(nlogn) => O(logn)
					webApi.sort((a, b) => a.endTime - b.endTime);
					logger({
						time,
						type: 'push',
						queue: 'webApi',
						ast: callExpression.arguments[0],
						end: endTime,
					});
				} else if (isQueueMicrotaskExpression(callExpression)) {
					// queueMicroTask()
					addToQueue({ type: 'microtask', ast: callExpression.arguments[0] });
				} else if (isRequestAnimationFrameExpression(callExpression)) {
					// requestAnimationFrame()
					addToQueue({ type: 'rafCallback', ast: callExpression.arguments[0] });
				} else if (isIdentifier(callExpression.callee)) {
					const node = callExpression.callee;
					const nodeScope = scope.acquire(node) ?? scope.globalScope;
					const variable = nodeScope.set.get(node.name);
					if (!variable) throw new Error('Unsupported identifier in the scope');
					const definition = variable.defs[0];
					if (!isFunctionDeclaration(definition.node)) {
						throw new Error('Unsupported definition in the scope');
					}
					traverseChildren(definition.node.body, state, c);
				} else {
					traverseChildren(callExpression, state, c);
				}

				// post-traversal
				logger({ time, type: 'pop', queue: 'callstack', ast: callExpression });
			},
			BlockStatement(blockStatement, state, c) {
				// pre-traversal
				logger({ time, type: 'push', queue: 'callstack', ast: blockStatement });

				blockStatement.body.forEach((node) => {
					traverseChildren(node, state, c);
				});

				// post-traversal
				logger({ time, type: 'pop', queue: 'callstack', ast: blockStatement });
			},
			FunctionDeclaration() {
				// skip function declaration
			},
		}
	);
};
