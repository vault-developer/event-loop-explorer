import {MemberExpression, Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class MemberExpressionClass extends NodeClass {
  serializedArgs: string | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: AcornArguments) {
    super(acornNode, context);
    this.serializedArgs = args?.map(arg => nodeFactory(arg, context).serialize()).join(',');
  }

  serialize = () => {
    const expression = this.acornNode as MemberExpression;
    if (expression.object.type !== 'Identifier') {
      console.log('Serialize:MemberExpression:Identifier object.type is supported', expression);
      return '';
    } else if (expression.property.type !== 'Identifier') {
      console.log('Serialize:MemberExpression:Identifier property.type is supported', expression);
      return '';
    }

    return `${expression.object.name}.${expression.property.name}(${this.serializedArgs})`;
  }

  traverse = () => {
    const expression = this.acornNode as MemberExpression;
    if (expression.object.type !== 'Identifier') {
      return console.log('Traverse:MemberExpression: object.type: only Identifier is supported', expression);
    }
    if (expression.object.name !== 'console') {
      return console.log('Traverse:MemberExpression: object.name: only console is supported', expression);
    }

    this.context.steps.push({
      sector: 'console',
      action: 'push',
      value: this.serializedArgs
    });
  }
}