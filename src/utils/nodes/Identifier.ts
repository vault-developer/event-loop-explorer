import {FunctionDeclaration, Identifier, Node as AcornNode} from "acorn";
import {NodeClass, NodeClassConstructor, NodeClassParams} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class IdentifierClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const identifier = this.node as Identifier;

    if (this.params && identifier.name in this.params) {
      if (this.params[identifier.name] === undefined) {
        return 'undefined';
      }
      const node = this.params[identifier.name] as AcornNode;
      const param = nodeFactory({
        node,
        context: this.context,
      });
      return param.serialize();
    }

    return identifier.name;
  }

  traverse = () => {
    const identifier = this.node as Identifier;
    if (identifier.name === 'setTimeout') {
      this.context.actions.push({
        list: 'web_api',
        type: 'push',
        value: nodeFactory({
          node: this.node,
          context: this.context,
          params: this.params,
          args: this.args,
        })
      });
      return;
    } else if (identifier.name === 'queueMicrotask') {
      this.context.actions.push({
        list: 'microtask_queue',
        type: 'push',
        value: this.args && nodeFactory({
          node: this.args[0],
          context: this.context,
          params: this.params,
        })
      });
      return;
    } else if (identifier.name === 'requestAnimationFrame') {
      this.context.actions.push({
        list: 'render_callbacks',
        type: 'push',
        value: this.args && nodeFactory({
          node: this.args[0],
          context: this.context,
          params: this.params,
          args: this.args,
        })
      });
      return;
    } else if (this.context.functions[identifier.name]) {
      const customFunction = this.context.functions[identifier.name] as FunctionDeclaration;
      const params = customFunction.params.reduce((acc, param, index) => {
        acc[(param as Identifier).name] = this.args?.[index];
        return acc;
      }, {} as NodeClassParams);

      const blockStatement = nodeFactory({
        node: customFunction.body,
        context: this.context,
        params,
      });
      blockStatement.traverse();
      return;
    }

    return console.log('Traverse: IdentifierClass: identifier is not supported:', identifier);
  }
}