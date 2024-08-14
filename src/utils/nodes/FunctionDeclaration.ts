import {FunctionDeclaration, Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {NodeClass} from "./Node.abstract.ts";

export class FunctionDeclarationClass extends NodeClass {
  constructor(acornNode: AcornNode, context: ParseContextInterface) {
    super(acornNode, context);
  }

  traverse = () => {
    const functionDeclaration = this.acornNode as FunctionDeclaration;
    this.context.functions[functionDeclaration.id.name] = functionDeclaration;
  }
}

