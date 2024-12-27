import { getAstFromText } from './getAstFromText.ts';
import { EventLoop } from './eventLoop.ts';
import { getAstScope } from './ast.scope.ts';
import { getSerialisedSteps } from './ast.serialise.ts';

export const start = (text: string) => {
	try {
		const ast = getAstFromText(text);
		const scope = getAstScope(ast);
		console.log('scope:', scope);

		const eventLoop = new EventLoop(scope);
		const steps = eventLoop.calculate(ast);
		const serialised = getSerialisedSteps(steps, scope);
		console.log('serialised', serialised);

		return serialised;
	} catch (error) {
		window.confirm(
			`${error}\nIt looks like something is not implemented yet 🦝.\nFeel free to raise an issue on Github 🖥️.`
		);
		throw error;
	}
};
