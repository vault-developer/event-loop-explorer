import {ExpressionStatement, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class ExpressionStatementClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    const node = this.acornNode as ExpressionStatement;
    const expression = nodeFactory(node.expression, this.context);
    expression.traverse();
  }
}