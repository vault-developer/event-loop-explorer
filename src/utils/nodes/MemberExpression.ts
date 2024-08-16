import {CallExpression, MemberExpression} from "acorn";
import {NodeClass, NodeClassConstructor} from "./Node.abstract.ts";
import {nodeFactory} from "./factory.ts";

export class MemberExpressionClass extends NodeClass {
  constructor(params: NodeClassConstructor) {
    super(params);
  }

  serialize = () => {
    const expression = this.node as MemberExpression;

    const object = nodeFactory({
      node: expression.object,
      context: this.context,
      args: this.args,
      params: this.params,
    }).serialize();

    const property = nodeFactory({
      node: expression.property,
      context: this.context,
      args: this.args,
      params: this.params,
    }).serialize();

    return `${object}.${property}`;
  }

  traverse = () => {
    const memberExpression = this.node as MemberExpression;

    // handle console
    if (memberExpression.object.type === 'Identifier' && memberExpression.object.name === 'console') {
      return this.context.steps.push({
        sector: 'console',
        action: 'push',
        value: this.args?.map(arg => nodeFactory({
          node: arg,
          context: this.context,
          params: this.params,
        }).serialize()).join(',') ?? ''
      });
    }

    // handle promise.resolve().then()
    if (
      memberExpression.object.type === 'CallExpression' &&
      memberExpression.property.type === 'Identifier' &&
      memberExpression.property.name === 'then'
    ) {
      const callExpression = memberExpression.object as CallExpression;
      if (callExpression.callee.type === 'MemberExpression') {
        const innerMemberExpression = callExpression.callee;
        if (
          innerMemberExpression.object.type === 'Identifier' &&
          innerMemberExpression.object.name === 'Promise'
        ) {
          if (
            innerMemberExpression.property.type === 'Identifier' &&
            innerMemberExpression.property.name === 'resolve'
          ) {
            return this.context.steps.push({
              sector: 'microtask_queue',
              action: 'push',
              value: this.args?.[0]
            });
          }
        }
      }
    }

    return console.log('Traverse:MemberExpression: not supported', memberExpression);
  }
}