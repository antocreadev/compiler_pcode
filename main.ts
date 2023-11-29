import Parser from "./Parser.ts"
import TableSymbole from "./TableSymbole.ts";
import TranslatePcode from "./TranslatePcode.ts";

const input = Deno.readTextFile("./test.src");

const parser = new Parser();
const ast = parser.produceAST(await input);

const tablesym = new TableSymbole(ast.body);
const translatePcode = new TranslatePcode(tablesym.generateTableSymbole(ast.body), ast.body);
console.log(console.log(JSON.stringify(ast, null, 4)));
translatePcode.generate_pcode(ast.body);
console.table(translatePcode.get_tablesym());
console.table(translatePcode.get_pcode());