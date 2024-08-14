import {ArrowFunctionExpression, Identifier, Literal} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";

export class IdentifierClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const identifier = this.node as Identifier;
    return `${identifier.name}`;
  }

  traverse = () => {
    const identifier = this.node as Identifier;
    if (identifier.name === 'setTimeout') {
      this.context.steps.push({
        sector: 'web_api',
        action: 'push',
        value: {
          type: 'setTimeout',
          delay: (this.args?.[1] as Literal)?.value ?? 0,
          callback: (this.args?.[0] as ArrowFunctionExpression).body,
        }
      });
      return;
    } else if (this.context.functions[identifier.name]) {
      // customFunction = this.context.functions[identifier.name];
      //TODO: implement custom function
      //const blockStatement = nodeFactory(customFunction.body, this.context);
      console.log('manage custom function');
      return;
    }

    return console.log('Traverse: IdentifierClass: identifier is not supported:', identifier);
  }
}