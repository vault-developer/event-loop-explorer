import {Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";

export abstract class NodeClass {
  parentArgs: AcornArguments | undefined;

  constructor(acornNode: AcornNode, context: ParseContextInterface, parentArgs?: AcornArguments) {
    this.acornNode = acornNode;
    this.context = context;
    this.parentArgs = parentArgs;

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