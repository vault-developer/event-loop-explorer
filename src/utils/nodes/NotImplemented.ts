import { NodeClass, NodeClassConstructor } from './Node.abstract.ts';

export class NotImplementedNodeClass extends NodeClass {
	constructor(params: NodeClassConstructor) {
		super(params);
	}

	traverse = () => {
		console.log('Traverse: this node class is not implemented', this.node);
		window.confirm(`
Parsing logic for node "${this.node.type}" is not implemented yet 🦝.
Feel free to contribute to the project by implementing it or raising an issue on Github 🖥️.`);
	};

	serialize = () => {
		console.log('Serialize: this node class is not implemented', this.node);
		window.confirm(`
Serialization logic for node "${this.node.type}" is not implemented yet 🦝.
Feel free to contribute to the project by implementing it or raising an issue on Github 🖥️.`);
		return '';
	};
}
