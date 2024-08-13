import {Literal, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class LiteralClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  serialize = () => {
    const literal = this.acornNode as Literal;
    return `${literal.value}`;
  }

  traverse = () => {}
}