import {ArrowFunctionExpression} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class ArrowFunctionExpressionClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const arrowFunctionExpression = this.node as ArrowFunctionExpression;
    const body = nodeFactory({
      node: arrowFunctionExpression.body,
      context: this.context
    });
    return `() => ${body.serialize()}`;
  }

  traverse = () => {
  }
}