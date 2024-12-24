import * as acornWalk from 'acorn-walk';
import {isConsoleMethodCall, isMemberExpression, isPromiseCallback} from './ast.guards.ts';
import {ELStep, Queue} from './eventLoop.types.ts';
import { Node } from 'acorn';

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
}: {
	ast: Node;
	logger: (step: ELStep) => void;
	addToQueue: ({ type, ast }: { type: Queue; ast: Node }) => void;
}) => {
	acornWalk.recursive(
		ast,
		{},
		{
			CallExpression(node, state, c) {
				// pre-traversal
				logger({
					type: 'push',
					queue: 'callstack',
					ast: node,
				});

				if (
					// console.log()
					isMemberExpression(node.callee) &&
					isConsoleMethodCall(node.callee)
				) {
					logger({
						type: 'push',
						queue: 'console',
						ast: node,
					});
				}

				if (
					// promise.resolve.then()
					isMemberExpression(node.callee) &&
					isPromiseCallback(node.callee)
				) {
					addToQueue({
						type: 'microtask',
						ast: node.arguments[0],
					})
				} else {
					traverseChildren(node, state, c);
				}

				// post-traversal
				logger({
					type: 'pop',
					queue: 'callstack',
				});
			},
		}
	);
};
