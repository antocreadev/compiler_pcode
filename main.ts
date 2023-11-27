import Parser from "./Parser.ts"
import TableSymbole from "./TableSymbole.ts";

const input = Deno.readTextFile("./test.src");

const parser = new Parser();
const ast = parser.produceAST(await input);

const tablesym = new TableSymbole(ast.body);
console.log(tablesym.generateTableSymbole(ast.body));

