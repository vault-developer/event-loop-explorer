import { getRowColByCursorPosition } from './store.utils';

describe('getRowColByCursorPosition', () => {
	test('should return correct position for single line with content', () => {
		const result = getRowColByCursorPosition('const x = 5;', 5);
		expect(result).toEqual({ row: 0, column: 5 });
	});

	test('should return correct position for multiple lines', () => {
		const code = 'const x = 5;\nconst y = 10;';
		const result = getRowColByCursorPosition(code, 15);
		expect(result).toEqual({ row: 1, column: 2 });
	});

	test('should return correct position when cursor is at end of line', () => {
		const code = 'const x = 5;\nconst y = 10;';
		const result = getRowColByCursorPosition(code, 11);
		expect(result).toEqual({ row: 0, column: 11 });
	});

	test('should return correct position when cursor is at beginning of line after newline', () => {
		const code = 'const x = 5;\nconst y = 10;';
		const result = getRowColByCursorPosition(code, 13);
		expect(result).toEqual({ row: 1, column: 0 });
	});

	test('should handle index at the end of the string', () => {
		const code = 'const x = 5;\nconst y = 10;';
		const result = getRowColByCursorPosition(code, code.length);
		expect(result).toEqual({ row: 1, column: 12 });
	});
});
