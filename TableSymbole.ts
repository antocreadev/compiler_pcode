import { Stmt, VariableDeclaration, DoWhileLoop } from "./ast.ts";

export default class TableSymbole {
    private declarations : string[];
    private astBody : Array<Stmt>;

    constructor(astBody: Array<Stmt>) {
        this.astBody = astBody
        this.declarations = [];
    }

    private isVariableDeclaration = (stmt: Stmt): stmt is VariableDeclaration =>
        stmt.kind === "VariableDeclaration";

    private isDoWhileLoop = (stmt: Stmt): stmt is DoWhileLoop =>
        stmt.kind === "DoWhileLoop";

    public generateTableSymbole(astBody: Array<Stmt>) {
    this.astBody = astBody;
    let declarations :string[]= [];
    for (const element of this.astBody) {
        if (this.isVariableDeclaration(element)) {
            declarations.push(element.identifier.symbol);
        } else if (this.isDoWhileLoop(element)) {
            declarations = declarations.concat(this.generateTableSymbole(element.body));
        }
    }
    return declarations;
    }
}

