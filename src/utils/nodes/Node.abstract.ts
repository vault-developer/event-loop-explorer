import {Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";

export abstract class NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    this.acornNode = acornNode;
    this.context = context;
  }

  acornNode: AcornNode;
  context: ParseContextInterface;
  abstract traverse: () => void;
}