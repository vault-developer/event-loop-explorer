export function indexToRowColumn(sourceCode: string, index: number) {
	const lines = sourceCode.slice(0, index).split('\n');
	return {
		row: lines.length - 1,
		column: lines[lines.length - 1].length,
	};
}
