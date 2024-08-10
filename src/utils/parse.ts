import {
  CallExpression,
  ExpressionStatement,
  FunctionDeclaration, Identifier, MemberExpression,
  ModuleDeclaration,
  parse as acornParse,
  Statement
} from 'acorn';
import {ParseContextInterface, StepInterface} from "./parse.types.ts";


/**
 * - handleNode
 *  - handleFunctionDeclaration
 *  - handleExpressionStatement
 *    - handleCallExpression
 *      - handleIdentifier
 *        - setTimeout
 *      - handleMemberExpression
 *        - console.*
 * */
const handleNode = (node: Statement | ModuleDeclaration, context: ParseContextInterface) => {
  switch (node.type) {
    case 'FunctionDeclaration':
      return handleFunctionDeclaration(node, context);
    case 'ExpressionStatement':
      return handleExpressionStatement(node, context);
    default:
      console.log('handleNode: node type is not supported', node);
  }
}
const handleFunctionDeclaration = (node: FunctionDeclaration, context: ParseContextInterface) => {
  console.log('handleFunctionDeclaration: FunctionDeclaration is not implemented', node, context);
}
const handleExpressionStatement = (node: ExpressionStatement, context: ParseContextInterface) => {
  if (node.expression.type === 'CallExpression') {
    handleCallExpression(node.expression, context);
  } else {
    return console.log('handleExpressionStatement: expression type is not supported', node);
  }
}
const handleCallExpression = (expression: CallExpression, context: ParseContextInterface) => {
  if (expression.callee.type === 'MemberExpression') {
    handleMemberExpression(expression.callee, expression.arguments, context);
  } else if (expression.callee.type === 'Identifier') {
    handleIdentifier(expression.callee, expression.arguments, context);
  } else {
    console.log('handleCallExpression: only MemberExpression & Identifier are supported', expression);
  }
}
const handleMemberExpression = (expression: MemberExpression, args: CallExpression['arguments'], context: ParseContextInterface) => {
  if (expression.object.type === 'Identifier' && expression.object.name === 'console') {
    if ("value" in args[0]) {
      context.steps.push({
        sector: 'console',
        action: 'push',
        value: args[0]?.value as StepInterface['value'],
      });
    }
  } else {
    console.log('handleMemberExpression: only console is supported', expression);
  }
}
const handleIdentifier= (identifier: Identifier, args: CallExpression['arguments'], context: ParseContextInterface) => {
  if (identifier.name === 'setTimeout') {
    context.steps.push({
      sector: 'web_api',
      action: 'push',
      value: args as StepInterface['value'],
    });
  } else {
    console.log('handleIdentifier: only setTimeout is supported');
  }
}

export const parse = (code: string) => {
  const context: ParseContextInterface = {
    steps: [],
    functions: {},
  }
  const parsed = acornParse(code, {ecmaVersion: 2020});

  for (const node of parsed.body) {
    handleNode(node, context);
  }

  console.log('all nodes:', parsed.body);
  console.log('context:', context);
};