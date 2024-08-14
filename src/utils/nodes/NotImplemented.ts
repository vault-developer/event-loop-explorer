import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";

export class NotImplementedNodeClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  traverse = () => {
    console.log('Traverse: this node class is not implemented', this.node);
  }

  serialize = () => {
    console.log('Serialize: this node class is not implemented', this.node);
    return '';
  }
}

