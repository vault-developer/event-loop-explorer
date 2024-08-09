import {
  CallExpression,
  ExpressionStatement,
  FunctionDeclaration, MemberExpression,
  ModuleDeclaration,
  parse as acornParse,
  Statement
} from 'acorn';

export interface StepInterface {
  sector: 'callstack' | 'task_queue' | 'microtask_queue' | 'console' | 'web_api';
  action: 'push' | 'pop';
  value: string | object;
}

/**
 * - handleNode
 *  - handleFunctionDeclaration
 *  - handleExpressionStatement
 *    - handleCallExpression
 *      - handleMemberExpression
 *        - console.*
 * */

const handleNode = (node: Statement | ModuleDeclaration, steps: StepInterface[]) => {
  switch (node.type) {
    case 'FunctionDeclaration':
      return handleFunctionDeclaration(node);
    case 'ExpressionStatement':
      return handleExpressionStatement(node, steps);
    default:
      console.log('handleNode: node type is not supported', node);
  }
}
const handleFunctionDeclaration = (node: FunctionDeclaration) => {
  console.log('handleFunctionDeclaration: FunctionDeclaration is not implemented', node);
}
const handleExpressionStatement = (node: ExpressionStatement, steps: StepInterface[]) => {
  if (node.expression.type === 'CallExpression') {
    handleCallExpression(node.expression, steps);
  } else {
    return console.log('handleExpressionStatement: expression type is not supported', node);
  }
}
const handleCallExpression = (expression: CallExpression, steps: StepInterface[]) => {
  if (expression.callee.type === 'MemberExpression') {
    handleMemberExpression(expression.callee, expression.arguments, steps);
  } else {
    console.log('handleCallExpression: only MemberExpression is supported', expression);
  }
}
const handleMemberExpression = (expression: MemberExpression, args: CallExpression['arguments'], steps: StepInterface[]) => {
  if (expression.object.type === 'Identifier' && expression.object.name === 'console') {
    steps.push({
      sector: 'console',
      action: 'push',
      value: args[0].value,
    });
  } else {
    console.log('handleMemberExpression: only console is supported', expression);
  }
}

export const parse = (code: string) => {
  const steps: StepInterface[] = [];
  const parsed = acornParse(code, {ecmaVersion: 2020});

  for (const node of parsed.body) {
    handleNode(node, steps);
  }

  console.log('all nodes:', parsed.body);
  console.log('steps:', steps);
};