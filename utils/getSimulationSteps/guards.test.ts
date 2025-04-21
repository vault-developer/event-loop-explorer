import {
	isArrowFunctionExpression,
	isBlockStatement,
	isCallExpression,
	isExpressionStatement,
	isFunctionDeclaration,
	isIdentifier,
	isLiteral,
	isMemberExpression,
	isProgram,
	isSpreadElement,
} from './guards';
import {
	ArrowFunctionExpression,
	BlockStatement,
	CallExpression,
	ExpressionStatement,
	FunctionDeclaration,
	Identifier,
	Literal,
	MemberExpression,
	Program,
	SpreadElement,
} from 'acorn';

describe('AST guards:', () => {
	describe('isMemberExpression', () => {
		it('should return true for a standard member expression', () => {
			const node: MemberExpression = {
				type: 'MemberExpression',
				start: 0,
				end: 11,
				object: {
					type: 'Identifier',
					start: 0,
					end: 7,
					name: 'console',
				},
				property: {
					type: 'Identifier',
					start: 8,
					end: 11,
					name: 'log',
				},
				computed: false,
				optional: false,
			};
			expect(isMemberExpression(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isMemberExpression(null)).toBe(false);
			expect(isMemberExpression(undefined)).toBe(false);
			expect(isMemberExpression({})).toBe(false);
			expect(isMemberExpression({ type: 'OtherExpression' })).toBe(false);
		});
	});

	describe('isIdentifier', () => {
		it('should return true for a standard identifier', () => {
			const node: Identifier = {
				type: 'Identifier',
				start: 0,
				end: 7,
				name: 'console',
			};
			expect(isIdentifier(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isIdentifier(null)).toBe(false);
			expect(isIdentifier(undefined)).toBe(false);
			expect(isIdentifier({})).toBe(false);
			expect(isIdentifier({ type: 'OtherExpression' })).toBe(false);
		});
	});

	describe('isCallExpression', () => {
		it('should return true for a standard call expression', () => {
			const node: CallExpression = {
				type: 'CallExpression',
				start: 0,
				end: 14,
				callee: {
					type: 'MemberExpression',
					start: 0,
					end: 11,
					object: {
						type: 'Identifier',
						start: 0,
						end: 7,
						name: 'console',
					},
					property: {
						type: 'Identifier',
						start: 8,
						end: 11,
						name: 'log',
					},
					computed: false,
					optional: false,
				},
				arguments: [
					{
						type: 'Literal',
						start: 12,
						end: 13,
						value: 1,
						raw: '1',
					},
				],
				optional: false,
			};
			expect(isCallExpression(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isCallExpression(null)).toBe(false);
			expect(isCallExpression(undefined)).toBe(false);
			expect(isCallExpression({})).toBe(false);
			expect(isCallExpression({ type: 'OtherExpression' })).toBe(false);
		});
	});

	describe('isBlockStatement', () => {
		it('should return true for a standard block statement', () => {
			const node: BlockStatement = {
				type: 'BlockStatement',
				start: 0,
				end: 20,
				body: [],
			};
			expect(isBlockStatement(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isBlockStatement(null)).toBe(false);
			expect(isBlockStatement(undefined)).toBe(false);
			expect(isBlockStatement({})).toBe(false);
			expect(isBlockStatement({ type: 'OtherStatement' })).toBe(false);
		});
	});

	describe('isExpressionStatement', () => {
		it('should return true for a standard expression statement', () => {
			const node: ExpressionStatement = {
				type: 'ExpressionStatement',
				start: 0,
				end: 15,
				expression: {
					start: 0,
					end: 7,
					optional: false,
					type: 'CallExpression',
					callee: { type: 'Identifier', name: 'console', start: 0, end: 7 },
					arguments: [],
				},
			};
			expect(isExpressionStatement(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isExpressionStatement(null)).toBe(false);
			expect(isExpressionStatement(undefined)).toBe(false);
			expect(isExpressionStatement({})).toBe(false);
			expect(isExpressionStatement({ type: 'OtherStatement' })).toBe(false);
		});
	});

	describe('isFunctionDeclaration', () => {
		it('should return true for a standard function declaration', () => {
			const node: FunctionDeclaration = {
				async: false,
				expression: false,
				generator: false,
				type: 'FunctionDeclaration',
				start: 0,
				end: 30,
				id: { type: 'Identifier', name: 'console', start: 0, end: 7 },
				params: [],
				body: {
					type: 'BlockStatement',
					start: 0,
					end: 20,
					body: [],
				},
			};
			expect(isFunctionDeclaration(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isFunctionDeclaration(null)).toBe(false);
			expect(isFunctionDeclaration(undefined)).toBe(false);
			expect(isFunctionDeclaration({})).toBe(false);
			expect(isFunctionDeclaration({ type: 'OtherDeclaration' })).toBe(false);
		});
	});

	describe('isLiteral', () => {
		it('should return true for a string literal', () => {
			const node: Literal = {
				type: 'Literal',
				start: 0,
				end: 5,
				value: 'hello',
				raw: '"hello"',
			};
			expect(isLiteral(node)).toBe(true);
		});

		it('should return true for a numeric literal', () => {
			const node: Literal = {
				type: 'Literal',
				start: 0,
				end: 3,
				value: 42,
				raw: '42',
			};
			expect(isLiteral(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isLiteral(null)).toBe(false);
			expect(isLiteral(undefined)).toBe(false);
			expect(isLiteral({})).toBe(false);
			expect(isLiteral({ type: 'OtherLiteral' })).toBe(false);
		});
	});

	describe('isArrowFunctionExpression', () => {
		it('should return true for a standard arrow function expression', () => {
			const node: ArrowFunctionExpression = {
				generator: false,
				type: 'ArrowFunctionExpression',
				start: 0,
				end: 30,
				params: [],
				body: { type: 'BlockStatement', body: [], start: 0, end: 20 },
				async: false,
				expression: false,
			};
			expect(isArrowFunctionExpression(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isArrowFunctionExpression(null)).toBe(false);
			expect(isArrowFunctionExpression(undefined)).toBe(false);
			expect(isArrowFunctionExpression({})).toBe(false);
			expect(isArrowFunctionExpression({ type: 'OtherExpression' })).toBe(
				false
			);
		});
	});

	describe('isProgram', () => {
		it('should return true for a standard program node', () => {
			const node: Program = {
				sourceType: 'script',
				type: 'Program',
				start: 0,
				end: 0,
				body: [],
			};
			expect(isProgram(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isProgram(null)).toBe(false);
			expect(isProgram(undefined)).toBe(false);
			expect(isProgram({})).toBe(false);
			expect(isProgram({ type: 'OtherProgram' })).toBe(false);
		});
	});

	describe('isSpreadElement', () => {
		it('should return true for a standard spread element', () => {
			const node: SpreadElement = {
				type: 'SpreadElement',
				start: 0,
				end: 10,
				argument: { type: 'Identifier', name: 'array', start: 4, end: 9 },
			};
			expect(isSpreadElement(node)).toBe(true);
		});

		it('should return false for null, undefined, object without type, object with different type', () => {
			expect(isSpreadElement(null)).toBe(false);
			expect(isSpreadElement(undefined)).toBe(false);
			expect(isSpreadElement({})).toBe(false);
			expect(isSpreadElement({ type: 'OtherElement' })).toBe(false);
		});
	});
});
