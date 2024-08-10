import {
  parse as acornParse,
} from 'acorn';
import {ParseContextInterface} from "./parse.types.ts";
import {nodeFactory} from "./nodes/factory.ts";

/**
 * - Node
 *  - FunctionDeclaration
 *  - ExpressionStatement
 *    - CallExpression
 *      - Identifier
 *        - setTimeout
 *        - customFunction
 *          - BlockStatement
 *            - ExpressionStatement (recursive)
 *      - MemberExpression
 *        - console.*
 * */
export const parse = (code: string) => {
  const context: ParseContextInterface = {
    steps: [],
    functions: {},
  }
  const parsed = acornParse(code, {ecmaVersion: 2020});

  for (const acornNode of parsed.body) {
    const node = nodeFactory(acornNode, context);
    node.traverse();
  }

  console.log('all nodes:', parsed.body);
  console.log('context:', context);
};