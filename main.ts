import Parser from "./Parser.ts"
import TableSymbole from "./TableSymbole.ts";
import { translatePcode } from "./translate.ts";

const input = Deno.readTextFile("./test.src");

const parser = new Parser();
const ast = parser.produceAST(await input);

const tablesym = new TableSymbole(ast.body);
console.log(translatePcode(await tablesym.generateTableSymbole(ast.body), ast.body))

