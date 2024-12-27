import { getAstFromText } from './utils/ast/ast.parser.ts';
import { Calculator } from './utils/calculator/calculator.ts';
import { getAstScope } from './utils/ast/ast.scope.ts';
import { getSerialisedSteps } from './utils/ast/ast.serialise.ts';
import { simulate } from './simulate.ts';
import { ELSerialisedStep } from './utils/calculator/calculator.types.ts';

export const start = (text: string) => {
	try {
		const ast = getAstFromText(text);
		const scope = getAstScope(ast);
		console.log('scope:', scope);

		const calculator = new Calculator(scope);
		const steps = calculator.calculate(ast);
		const serialised = getSerialisedSteps(steps, scope);
		const grouped = serialised.reduce(
			(acc: Record<string, ELSerialisedStep[]>, item: ELSerialisedStep) => {
				if (!acc[item.time]) {
					acc[item.time] = [];
				}
				acc[item.time].push(item);
				return acc;
			}, {});

		console.log('steps grouped by time', grouped);
		simulate(grouped);

		return grouped;
	} catch (error) {
		window.confirm(
			`${error}\nIt looks like something is not implemented yet 🦝.\nFeel free to raise an issue on Github 🖥️.`
		);
		throw error;
	}
};
