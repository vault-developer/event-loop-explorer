import {Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class NotImplementedNodeClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    console.log('Traverse: this node class is not implemented', this.acornNode);
  }
}

