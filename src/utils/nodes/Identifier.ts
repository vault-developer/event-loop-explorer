import {Identifier, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class IdentifierClass extends NodeClass {
  args: object[] | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, args?: object[]) {
    super(acornNode, context);
    this.args = args;
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