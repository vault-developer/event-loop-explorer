import { CallExpression } from 'acorn';
import {
	isConsoleExpression,
	isQueueMicrotaskExpression,
	isSetTimeoutExpression,
} from './ast.utils';

describe('AST utils:', () => {
	describe('isConsoleExpression', () => {
		it('returns true for console.log', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				optional: false,
				start: 0,
				end: 10,
				callee: {
					type: 'MemberExpression',
					computed: false,
					optional: false,
					start: 0,
					end: 10,
					object: { type: 'Identifier', name: 'console', start: 0, end: 7 },
					property: { type: 'Identifier', name: 'log', start: 8, end: 10 },
				},
				arguments: [],
			};
			expect(isConsoleExpression(expression)).toBe(true);
		});

		it('returns true for console.info', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				optional: false,
				start: 0,
				end: 10,
				callee: {
					type: 'MemberExpression',
					computed: false,
					optional: false,
					start: 0,
					end: 10,
					object: { type: 'Identifier', name: 'console', start: 0, end: 7 },
					property: { type: 'Identifier', name: 'info', start: 8, end: 10 },
				},
				arguments: [],
			};
			expect(isConsoleExpression(expression)).toBe(true);
		});

		it('returns false for non-console method', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				optional: false,
				start: 0,
				end: 12,
				callee: {
					type: 'MemberExpression',
					computed: false,
					optional: false,
					start: 0,
					end: 12,
					object: { type: 'Identifier', name: 'console', start: 0, end: 7 },
					property: { type: 'Identifier', name: 'debug', start: 8, end: 12 },
				},
				arguments: [],
			};
			expect(isConsoleExpression(expression)).toBe(false);
		});

		it('returns false for non-console object', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				optional: false,
				start: 0,
				end: 10,
				callee: {
					computed: false,
					optional: false,
					type: 'MemberExpression',
					start: 0,
					end: 10,
					object: { type: 'Identifier', name: 'logger', start: 0, end: 6 },
					property: { type: 'Identifier', name: 'log', start: 7, end: 10 },
				},
				arguments: [],
			};
			expect(isConsoleExpression(expression)).toBe(false);
		});

		it('returns false for non-member expression callee', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				optional: false,
				start: 0,
				end: 3,
				callee: { type: 'Identifier', name: 'log', start: 0, end: 3 },
				arguments: [],
			};
			expect(isConsoleExpression(expression)).toBe(false);
		});
	});

	describe('isSetTimeoutExpression', () => {
		it('returns true for setTimeout', () => {
			const expression: CallExpression = {
				optional: false,
				type: 'CallExpression',
				start: 0,
				end: 10,
				callee: { type: 'Identifier', name: 'setTimeout', start: 0, end: 10 },
				arguments: [],
			};
			expect(isSetTimeoutExpression(expression)).toBe(true);
		});

		it('returns false for other identifier', () => {
			const expression: CallExpression = {
				optional: false,
				type: 'CallExpression',
				start: 0,
				end: 10,
				callee: { type: 'Identifier', name: 'setInterval', start: 0, end: 10 },
				arguments: [],
			};
			expect(isSetTimeoutExpression(expression)).toBe(false);
		});

		it('returns false for non-identifier callee', () => {
			const expression: CallExpression = {
				type: 'CallExpression',
				start: 0,
				end: 15,
				optional: false,
				callee: {
					type: 'MemberExpression',
					computed: false,
					optional: false,
					start: 0,
					end: 15,
					object: { type: 'Identifier', name: 'window', start: 0, end: 6 },
					property: {
						type: 'Identifier',
						name: 'setTimeout',
						start: 7,
						end: 15,
					},
				},
				arguments: [],
			};
			expect(isSetTimeoutExpression(expression)).toBe(false);
		});
	});

	describe('isQueueMicrotaskExpression', () => {
		it('returns true for queueMicrotask', () => {
			const expression: CallExpression = {
				optional: false,
				type: 'CallExpression',
				start: 0,
				end: 15,
				callee: {
					type: 'Identifier',
					name: 'queueMicrotask',
					start: 0,
					end: 15,
				},
				arguments: [],
			};
			expect(isQueueMicrotaskExpression(expression)).toBe(true);
		});

		it('returns false for other identifier', () => {
			const expression: CallExpression = {
				optional: false,
				type: 'CallExpression',
				start: 0,
				end: 10,
				callee: { type: 'Identifier', name: 'setTimeout', start: 0, end: 10 },
				arguments: [],
			};
			expect(isQueueMicrotaskExpression(expression)).toBe(false);
		});

		it('returns false for non-identifier callee', () => {
			const expression: CallExpression = {
				optional: false,
				type: 'CallExpression',
				start: 0,
				end: 20,
				callee: {
					type: 'MemberExpression',
					computed: false,
					optional: false,
					start: 0,
					end: 20,
					object: { type: 'Identifier', name: 'window', start: 0, end: 6 },
					property: {
						type: 'Identifier',
						name: 'queueMicrotask',
						start: 7,
						end: 20,
					},
				},
				arguments: [],
			};
			expect(isQueueMicrotaskExpression(expression)).toBe(false);
		});
	});
});
