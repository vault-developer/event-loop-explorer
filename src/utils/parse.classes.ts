import {CallExpression, ExpressionStatement, Identifier, MemberExpression, Node as AcornNode} from "acorn";
import {ParseContextInterface, StepInterface} from "./parse.types.ts";

export const nodeFactory = (acornNode: AcornNode, context: ParseContextInterface, args?: object[] | undefined) => {
  switch (acornNode.type) {
    case 'FunctionDeclaration':
      return new FunctionDeclarationClass(acornNode, context);
    case 'ExpressionStatement':
      return new ExpressionStatementClass(acornNode, context);
    case 'CallExpression':
      return new CallExpressionClass(acornNode, context);
    case 'MemberExpression':
      return new MemberExpressionClass(acornNode, context, args);
    case 'Identifier':
      return new IdentifierClass(acornNode, context, args);
    default:
      return new NotImplementedNodeClass(acornNode, context);
  }
}

abstract class NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    this.acornNode = acornNode;
    this.context = context;
  }

  acornNode: AcornNode;
  context: ParseContextInterface;
  abstract traverse: () => void;
}

class FunctionDeclarationClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    console.log('FunctionDeclaration traverse');
  }
}

class ExpressionStatementClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    const node = this.acornNode as ExpressionStatement;
    const expression = nodeFactory(node.expression, this.context);
    expression.traverse();
  }
}

class CallExpressionClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    const node = this.acornNode as CallExpression;
    const callee = nodeFactory(node.callee, this.context, node.arguments);

    this.context.steps.push({
      sector: 'callstack',
      action: 'push',
      value: `expression`,
    })
    callee.traverse();
    this.context.steps.push({
      sector: 'callstack',
      action: 'pop',
    })
  }
}

class MemberExpressionClass extends NodeClass {
  args: object[] | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: object[]) {
    super(acornNode, context);
    this.args = args;
  }

  traverse = () => {
    const expression = this.acornNode as MemberExpression;
    if (expression.object.type === 'Identifier' && expression.object.name === 'console') {
      this.context.steps.push({
        sector: 'console',
        action: 'push',
        value: this.args?.map(arg => arg.value).join(',') as StepInterface['value'],
      });
    } else {
      console.log('handleMemberExpression: only console is supported', expression);
    }

  }
}

class IdentifierClass extends NodeClass {
  args: object[] | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: object[]) {
    super(acornNode, context);
    this.args = args;
  }

  traverse = () => {
    const identifier = this.acornNode as Identifier;
    if (identifier.name === 'setTimeout') {
      this.context.steps.push({
        sector: 'web_api',
        action: 'push',
        value: 'setTimeout'
      });
    } else {
      console.log('IdentifierClass: only setTimeout is supported', identifier);
    }
  }
}

class NotImplementedNodeClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    console.log('Traverse: this node class is not implemented', this.acornNode);
  }
}

