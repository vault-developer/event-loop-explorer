import * as acornWalk from 'acorn-walk';
import {
	isConsoleExpression,
	isPromiseCallbackExpression,
	isSetTimeoutExpression,
} from './ast.utils.ts';
import { ELStep, Queue, WebApiTask } from './eventLoop.types.ts';
import { Node } from 'acorn';
import { isLiteral } from './ast.guards.ts';

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
}: {
	ast: Node;
	logger: (step: ELStep) => void;
	addToQueue: ({
		type,
		ast,
	}: {
		type: Exclude<Queue, 'webApi'>;
		ast: Node;
	}) => void;
	time: number;
	webApi: WebApiTask[];
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
					logger({ type: 'push', queue: 'console', ast: callExpression, time });
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
					// TODO: make ordering more efficient O(n) => O(logn)
					webApi.sort((a, b) => b.endTime - a.endTime);
					logger({
						time,
						type: 'push',
						queue: 'webApi',
						ast,
						end: endTime,
					});
				} else {
					traverseChildren(callExpression, state, c);
				}

				// post-traversal
				logger({ time, type: 'pop', queue: 'callstack' });
			},
		}
	);
};
