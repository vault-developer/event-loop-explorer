import { getAstFromText } from './ast/ast.parser.ts';
import { Calculator } from './calculator/calculator.ts';
import { getAstScope } from './ast/ast.scope.ts';
import { getSerialisedSteps } from './ast/ast.serialise.ts';
import { simulate } from './simulate.ts';

export const start = (text: string, onStop: () => void) => {
	try {
		const ast = getAstFromText(text);
		const scope = getAstScope(ast);
		const calculator = new Calculator(scope);
		const steps = calculator.calculate(ast);
		const serialised = getSerialisedSteps(steps, scope);
		simulate(serialised, onStop);
	} catch (error) {
		window.confirm(
			`${error}\nIt looks like something is not implemented yet 🦝.\nFeel free to raise an issue on Github 🖥️.`
		);
		throw error;
	}
};
