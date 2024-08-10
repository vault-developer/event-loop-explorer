import {MemberExpression, Node as AcornNode} from "acorn";
import {ParseContextInterface, StepInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class MemberExpressionClass extends NodeClass {
  args: object[] | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: object[]) {
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
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return `${expression.object.name}.${expression.property.name}(${this.args?.map(arg => arg.value).join(',')})`;
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