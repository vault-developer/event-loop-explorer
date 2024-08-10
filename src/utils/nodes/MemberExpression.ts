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
    return `${expression.object.name}.${expression.property.name}(${this.args?.map(arg => arg.value).join(',')})`;
  }

  traverse = () => {
    const expression = this.acornNode as MemberExpression;
    if (expression.object.type === 'Identifier' && expression.object.name === 'console') {
      this.context.steps.push({
        sector: 'console',
        action: 'push',
        value: this.serialize() as StepInterface['value'],
      });
    } else {
      console.log('handleMemberExpression: only console is supported', expression);
    }
  }
}