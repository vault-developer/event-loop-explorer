import { getAstFromText } from './getAstFromText';
import { Calculator } from './calculator';
import { getScopeFromAst } from './getScopeFromAst';
import { getSerialisedSteps } from './getSerializedSteps';

export const getSimulationSteps = (text: string) => {
	try {
		const ast = getAstFromText(text);
		console.log('ast:', ast);
		const scope = getScopeFromAst(ast);
		const steps = new Calculator(scope).getSteps(ast);
		const serialised = getSerialisedSteps(steps, scope);
		console.log('serialised steps:', serialised);

		return serialised;
	} catch (error) {
		window.confirm(
			`${error}\nIt looks like something is not implemented yet 🦝.\nFeel free to raise an issue on Github 🖥️.`
		);
		throw error;
	}
};
