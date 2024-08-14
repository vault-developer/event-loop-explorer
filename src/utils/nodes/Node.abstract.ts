import {Node as AcornNode} from "acorn";
import {AcornArguments, ParseContextInterface} from "../parse.types.ts";

export interface NodeClassConstructor {
  node: AcornNode,
  context: ParseContextInterface,
  args?: AcornArguments,
  params?: Record<string, unknown>
}

export abstract class NodeClass {
  constructor({node, context, args, params}: NodeClassConstructor) {
    this.node = node;
    this.context = context;
    this.args = args;
    this.params = params;

    this.serialize = () => {
      console.log('Serialize method is not implemented for the node:', node);
      return '';
    }
  }

  node: AcornNode;
  context: ParseContextInterface;
  args?: AcornArguments;
  params?: Record<string, unknown>;
  serialize: () => string;
  abstract traverse: () => void;
}