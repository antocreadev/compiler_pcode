// deno-lint-ignore-file no-explicit-any

import { Stmt, VariableDeclaration, DoWhileLoop } from "./ast.ts";
const isVariableDeclaration = (stmt: Stmt): stmt is VariableDeclaration =>
  stmt.kind === "VariableDeclaration";

const isDoWhileLoop = (stmt: Stmt): stmt is DoWhileLoop =>
  stmt.kind === "DoWhileLoop";

const tablesym = (body : Array<Stmt>)=> {
    let declarations :string[]= [];
    for (const element of body) {
        if (isVariableDeclaration(element)) {
            declarations.push(element.identifier.symbol);
        } else if (isDoWhileLoop(element)) {
            declarations = declarations.concat(tablesym(element.body));
        }
    }
    return declarations;
}
export default tablesym;