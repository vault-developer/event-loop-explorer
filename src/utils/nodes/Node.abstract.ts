import {Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";

export abstract class NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    this.acornNode = acornNode;
    this.context = context;
    this.serialize = () => 'searialization not implemented';
  }

  acornNode: AcornNode;
  context: ParseContextInterface;
  serialize: () => string;
  abstract traverse: () => void;
}