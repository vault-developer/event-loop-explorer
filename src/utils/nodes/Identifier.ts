import {ArrowFunctionExpression, Identifier, Literal, Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

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
    if (identifier.name !== 'setTimeout') {
      return console.log('Traverse: IdentifierClass: only setTimeout is supported', identifier);
    }

    this.context.steps.push({
      sector: 'web_api',
      action: 'push',
      value: {
        type: 'setTimeout',
        delay: (this.parentArgs?.[1] as Literal)?.value ?? 0,
        callback: (this.parentArgs?.[0] as ArrowFunctionExpression).body,
      }
    });
  }
}