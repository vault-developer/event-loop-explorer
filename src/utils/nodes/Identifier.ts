import {Identifier, Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class IdentifierClass extends NodeClass {
  args: AcornArguments | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: AcornArguments) {
    super(acornNode, context);
    this.args = args;
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
      value: 'setTimeout'
    });
  }
}