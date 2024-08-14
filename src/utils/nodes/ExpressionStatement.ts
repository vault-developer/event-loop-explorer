import {ExpressionStatement} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class ExpressionStatementClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  traverse = () => {
    const node = this.node as ExpressionStatement;
    const expression = nodeFactory({node: node.expression, context: this.context});
    expression.traverse();
  }
}