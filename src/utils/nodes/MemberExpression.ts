import {MemberExpression} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class MemberExpressionClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const expression = this.node as MemberExpression;
    if (expression.object.type !== 'Identifier') {
      console.log('Serialize:MemberExpression:Identifier object.type is supported', expression);
      return '';
    } else if (expression.property.type !== 'Identifier') {
      console.log('Serialize:MemberExpression:Identifier property.type is supported', expression);
      return '';
    }

    return `${expression.object.name}.${expression.property.name}`;
  }

  traverse = () => {
    const expression = this.node as MemberExpression;
    if (expression.object.type !== 'Identifier') {
      return console.log('Traverse:MemberExpression: object.type: only Identifier is supported', expression);
    }
    if (expression.object.name !== 'console') {
      return console.log('Traverse:MemberExpression: object.name: only console is supported', expression);
    }

    this.context.steps.push({
      sector: 'console',
      action: 'push',
      value: this.args?.map(arg => nodeFactory({
        node: arg,
        context: this.context,
        params: this.params,
      }).serialize()).join(',') ?? ''
    });
  }
}