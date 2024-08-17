import {CallExpression} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class CallExpressionClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const node = this.node as CallExpression;
    const callee = nodeFactory({
      node: node.callee,
      context: this.context,
      args: node.arguments,
      params: this.params,
    });
    const serializedArgs = node.arguments.map((arg) => nodeFactory({
      node: arg,
      context: this.context,
      params: this.params,
    }).serialize()).join(', ') ?? '';
    return `${callee.serialize()}(${serializedArgs})`;
  }

  traverse = () => {
    const node = this.node as CallExpression;
    const callee = nodeFactory({
      node: node.callee,
      context: this.context,
      args: node.arguments,
      params: this.params,
    });

    this.context.actions.push({
      list: 'callstack',
      type: 'push',
      value: this.serialize(),
    })
    callee.traverse();
    this.context.actions.push({
      list: 'callstack',
      type: 'pop',
    })
  }
}
