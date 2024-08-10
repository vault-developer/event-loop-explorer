import {Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";

export abstract class NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    this.acornNode = acornNode;
    this.context = context;
    this.serialize = () => {
      console.log('Serialize: is not implemented for this node:', acornNode);
      return '';
    }
  }

  acornNode: AcornNode;
  context: ParseContextInterface;
  serialize: () => string;
  abstract traverse: () => void;
}