import { getSerialisedSteps, serialiseNode } from './getSerializedSteps';
import { ScopeManager } from 'eslint-scope';
import {
	ArrowFunctionExpression,
	BlockStatement,
	CallExpression,
	ExpressionStatement,
	Identifier,
	Literal,
	MemberExpression,
	Program,
} from 'acorn';
import { ELStep } from '@/utils/types';

describe('AST serialise:', () => {
	describe('getSerialisedSteps', () => {
		const mockScope = {} as ScopeManager;

		it('should serialise steps without AST as is', () => {
			const steps: ELStep[] = [
				{
					time: 0,
					type: 'markStop',
					stop: 'macrotask',
					value: true,
				},
				{
					time: 270,
					type: 'markStop',
					stop: 'microtask',
					value: true,
				},
			];
			const result = getSerialisedSteps(steps, mockScope);
			expect(result).toEqual(steps);
		});
	});

	describe('serialiseNode', () => {
		const mockScope = {} as ScopeManager;

		it('serialises Program node', () => {
			const node: Program = {
				body: [],
				end: 0,
				start: 0,
				type: 'Program',
				sourceType: 'script',
			};
			expect(serialiseNode(node, mockScope)).toBe('script');
		});

		it('serialises Literal node', () => {
			const node: Literal = {
				end: 0,
				start: 0,
				type: 'Literal',
				value: 'hello',
			};
			expect(serialiseNode(node, mockScope)).toBe('hello');
		});

		it('serialises Identifier node', () => {
			const node: Identifier = {
				end: 0,
				start: 0,
				type: 'Identifier',
				name: 'testVar',
			};
			expect(serialiseNode(node, mockScope)).toBe('testVar');
		});

		it('serialises CallExpression node', () => {
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
			expect(serialiseNode(node, mockScope)).toBe('console.log(1)');
		});

		it('serialises MemberExpression node', () => {
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
			expect(serialiseNode(node, mockScope)).toBe('console.log');
		});

		it('serialises ExpressionStatement node', () => {
			const node: ExpressionStatement = {
				type: 'ExpressionStatement',
				start: 0,
				end: 15,
				expression: {
					start: 0,
					end: 7,
					optional: false,
					type: 'CallExpression',
					callee: { type: 'Identifier', name: 'setTimeout', start: 0, end: 7 },
					arguments: [],
				},
			};
			expect(serialiseNode(node, mockScope)).toBe('setTimeout()');
		});

		it('serialises BlockStatement node', () => {
			const node: BlockStatement = {
				type: 'BlockStatement',
				start: 0,
				end: 15,
				body: [
					{
						type: 'ExpressionStatement',
						start: 0,
						end: 15,
						expression: {
							start: 0,
							end: 7,
							optional: false,
							type: 'CallExpression',
							callee: {
								type: 'Identifier',
								name: 'setTimeout',
								start: 0,
								end: 7,
							},
							arguments: [],
						},
					},
					{
						type: 'ExpressionStatement',
						start: 0,
						end: 15,
						expression: {
							start: 0,
							end: 7,
							optional: false,
							type: 'CallExpression',
							callee: {
								type: 'Identifier',
								name: 'setTimeout',
								start: 0,
								end: 7,
							},
							arguments: [],
						},
					},
				],
			};
			expect(serialiseNode(node, mockScope)).toBe(
				'{setTimeout()\nsetTimeout()}'
			);
		});

		it('serialises ArrowFunctionExpression node', () => {
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
			expect(serialiseNode(node, mockScope)).toBe('()=>{}');
		});

		it('throws error for unsupported node type', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const node = { type: 'UnsupportedType' } as any;
			expect(() => serialiseNode(node, mockScope)).toThrow(
				'Serialisation for node type UnsupportedType is not implemented'
			);
		});
	});
});
