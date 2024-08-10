import {Node as AcornNode} from "acorn";
import {ParseContextInterface} from "../parse.types.ts";
import {ExpressionStatementClass} from "./ExpressionStatement.ts";
import {CallExpressionClass} from "./CallExpression.ts";
import {FunctionDeclarationClass} from "./FunctionDeclaration.ts";
import {IdentifierClass} from "./Identifier.ts";
import {NotImplementedNodeClass} from "./NotImplemented.ts";
import {MemberExpressionClass} from "./MemberExpression.ts";


export const nodeFactory = (acornNode: AcornNode, context: ParseContextInterface, args?: object[] | undefined) => {
  switch (acornNode.type) {
    case 'FunctionDeclaration':
      return new FunctionDeclarationClass(acornNode, context);
    case 'ExpressionStatement':
      return new ExpressionStatementClass(acornNode, context);
    case 'CallExpression':
      return new CallExpressionClass(acornNode, context);
    case 'MemberExpression':
      return new MemberExpressionClass(acornNode, context, args);
    case 'Identifier':
      return new IdentifierClass(acornNode, context, args);
    default:
      return new NotImplementedNodeClass(acornNode, context);
  }
}