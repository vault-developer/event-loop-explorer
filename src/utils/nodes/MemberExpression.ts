import {MemberExpression, Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface, StepInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class MemberExpressionClass extends NodeClass {
  args: AcornArguments | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: AcornArguments) {
    super(acornNode, context);
    this.args = args;
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
    
    const args = this.args?.map(arg => nodeFactory(arg, this.context).serialize()).join(',') as string;
    return `${expression.object.name}.${expression.property.name}(${args})`;
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
      value: this.serialize() as StepInterface['value'],
    });
  }
}