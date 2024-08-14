import {CallExpression, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class CallExpressionClass extends NodeClass {

  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  serialize = () => {
    const node = this.acornNode as CallExpression;
    const callee = nodeFactory(node.callee, this.context, node.arguments);
    const serializedArgs = node.arguments.map((arg) => nodeFactory(arg, this.context).serialize()).join(', ') ?? '';
    return `${callee.serialize()}(${serializedArgs})`;
  }

  traverse = () => {
    const node = this.acornNode as CallExpression;
    const callee = nodeFactory(node.callee, this.context, node.arguments);

    this.context.steps.push({
      sector: 'callstack',
      action: 'push',
      value: this.serialize(),
    })
    callee.traverse();
    this.context.steps.push({
      sector: 'callstack',
      action: 'pop',
    })
  }
}
