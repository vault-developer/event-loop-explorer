import { getAstFromText } from './getAstFromText.ts';
import { EventLoop } from './eventLoop.ts';
// import * as acornWalk from 'acorn-walk';

export const start = (text: string) => {
	const ast = getAstFromText(text);
	const eventLoop = new EventLoop();
	const { scope: scopeManager, steps } = eventLoop.calculate(ast);

	console.log('result: \n', scopeManager, ast, steps);

	// acornWalk.simple(ast, {
	// 	Identifier(node) {
	// 		const scope = scopeManager.acquire(node) ?? scopeManager.globalScope;
	// 		const variable = scope.set.get(node.name);
	// 		if (!variable) return;
	// 		const value = variable.defs[0].node.init.value;
	// 		// use this resolved identifier somehow
	// 		console.log(`for identifier ${node.name} scope is resolved to ${value}`);
	// 	},
	// });
};
