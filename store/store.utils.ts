export const getRowColByCursorPosition = (
	sourceCode: string,
	index: number
) => {
	const lines = sourceCode.slice(0, index + 1).split('\n');
	return {
		row: lines.length - 1,
		column: lines[lines.length - 1].length - 1,
	};
};
