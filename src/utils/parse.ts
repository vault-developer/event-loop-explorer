import {
  BlockStatement,
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
 *        - customFunction
 *          - handleBlockStatement
 *            - handleExpressionStatement (recursive)
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
  context.functions[node.id.name] = node;
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
    context.steps.push({
      sector: 'callstack',
      action: 'push',
      value: `${expression.callee.object.name}.${expression.callee.property.name}(${serializeArgs(expression.arguments)})`,
    })
    handleMemberExpression(expression.callee, expression.arguments, context);
    context.steps.push({
      sector: 'callstack',
      action: 'pop'
    })
  } else if (expression.callee.type === 'Identifier') {
    context.steps.push({
      sector: 'callstack',
      action: 'push',
      value: `${expression.callee.name}(${serializeArgs(expression.arguments)})`,
    })
    handleIdentifier(expression, context);
    context.steps.push({
      sector: 'callstack',
      action: 'pop'
    })
  } else {
    console.log('handleCallExpression: only MemberExpression & Identifier are supported', expression);
  }
}
const handleMemberExpression = (expression: MemberExpression, args: CallExpression['arguments'], context: ParseContextInterface) => {
  if (expression.object.type === 'Identifier' && expression.object.name === 'console') {
    context.steps.push({
      sector: 'console',
      action: 'push',
      value: args.map(arg => arg.value).join(',') as StepInterface['value'],
    });
  } else {
    console.log('handleMemberExpression: only console is supported', expression);
  }
}
const handleIdentifier= (expression: CallExpression, context: ParseContextInterface) => {
  if (expression.callee.type !== 'Identifier') {
    return 'handleIdentifier: callee is not Identifier';
  }
  if (expression.callee.name === 'setTimeout') {
    context.steps.push({
      sector: 'web_api',
      action: 'push',
      value: expression,
    });
  } else if (context.functions[expression.callee.name]) {
    handleBlockStatement(context.functions[expression.callee.name].body, context);
  } else {
    console.log('handleIdentifier: only setTimeout is supported', expression);
  }
}
const handleBlockStatement= (blockStatement: BlockStatement, context: ParseContextInterface) => {
  for (const expression of blockStatement.body) {
    if (expression.type === 'ExpressionStatement') {
      handleExpressionStatement(expression, context);
    } else {
      console.log('handleBlockStatement: only ExpressionStatement is supported', expression);
    }
  }
}

const serializeArgs = (args: CallExpression['arguments']): string => {
  return args.map(arg => {
    if (arg.type === 'Literal') {
      return arg.value;
    } else if (arg.type === 'ArrowFunctionExpression') {
      if (arg.body.type === 'CallExpression') {
        return `() => ${arg.body.callee.object.name}.${arg.body.callee.property.name}(${serializeArgs(arg.body.arguments)})`;
      } else {
        console.log('serializeArgs: arg.body.type is not supported', arg.body.type);
        return '';
      }
    } else {
      console.log('serializeArgs: arg type is not supported', arg);
      return '';
    }
  }).join(', ');
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