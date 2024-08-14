import {ArrowFunctionExpression, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class ArrowFunctionExpressionClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  serialize = () => {
    const arrowFunctionExpression = this.acornNode as ArrowFunctionExpression;
    const body = nodeFactory(arrowFunctionExpression.body, this.context);
    return `() => ${body.serialize()}`;
  }

  traverse = () => {}
}