import { ArrowFunctionExpressionClass } from './ArrowFunctionExpression.ts';
import { AssignmentExpressionClass } from './AssignmentExpression.ts';
import { BinaryExpressionClass } from './BinaryExpression.ts';
import { BlockStatementClass } from './BlockStatement.ts';
import { CallExpressionClass } from './CallExpression.ts';
import { ExpressionStatementClass } from './ExpressionStatement.ts';
import { FunctionDeclarationClass } from './FunctionDeclaration.ts';
import { IdentifierClass } from './Identifier.ts';
import { LiteralClass } from './Literal.ts';
import { MemberExpressionClass } from './MemberExpression.ts';
import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';
import { NotImplementedNodeClass } from './NotImplemented.ts';
import { ProgramClass } from './Program.ts';
import { VariableDeclarationClass } from './VariableDeclaration.ts';

export const nodeFactory = (params: NodeClassConstructor): NodeClass => {
	switch (params.node.type) {
		case 'FunctionDeclaration':
			return new FunctionDeclarationClass(params);
		case 'ExpressionStatement':
			return new ExpressionStatementClass(params);
		case 'CallExpression':
			return new CallExpressionClass(params);
		case 'MemberExpression':
			return new MemberExpressionClass(params);
		case 'Identifier':
			return new IdentifierClass(params);
		case 'Literal':
			return new LiteralClass(params);
		case 'ArrowFunctionExpression':
			return new ArrowFunctionExpressionClass(params);
		case 'BlockStatement':
			return new BlockStatementClass(params);
		case 'Program':
			return new ProgramClass(params);
		case 'VariableDeclaration':
			return new VariableDeclarationClass(params);
		case 'AssignmentExpression':
			return new AssignmentExpressionClass(params);
		case 'BinaryExpression':
			return new BinaryExpressionClass(params);
		default:
			return new NotImplementedNodeClass(params);
	}
};
