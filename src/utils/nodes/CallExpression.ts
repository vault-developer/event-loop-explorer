import {CallExpression, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class CallExpressionClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    const node = this.acornNode as CallExpression;
    const callee = nodeFactory(node.callee, this.context, node.arguments);

    this.context.steps.push({
      sector: 'callstack',
      action: 'push',
      value: callee.serialize(),
    })
    callee.traverse();
    this.context.steps.push({
      sector: 'callstack',
      action: 'pop',
    })
  }
}
