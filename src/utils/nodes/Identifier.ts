import {ArrowFunctionExpression, Identifier, Literal, Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class IdentifierClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface, parentArgs?: AcornArguments) {
    super(acornNode, context, parentArgs);
  }

  serialize = () => {
    const identifier = this.acornNode as Identifier;
    return `${identifier.name}`;
  }

  traverse = () => {
    const identifier = this.acornNode as Identifier;
    if (identifier.name === 'setTimeout') {
      this.context.steps.push({
        sector: 'web_api',
        action: 'push',
        value: {
          type: 'setTimeout',
          delay: (this.parentArgs?.[1] as Literal)?.value ?? 0,
          callback: (this.parentArgs?.[0] as ArrowFunctionExpression).body,
        }
      });
      return;
    } else if (this.context.functions[identifier.name]) {
      // customFunction = this.context.functions[identifier.name];
      //TODO: implement custom function
      //const blockStatement = nodeFactory(customFunction.body, this.context);
      console.log('manage custom function');
      return;
    }

    return console.log('Traverse: IdentifierClass: identifier is not supported:', identifier);
  }
}