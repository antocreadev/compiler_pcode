import SyntaxAnalysis from "./SyntaxAnalysis.ts";
import TableSymbole from "./TableSymbole.ts";
import TranslatePcode from "./TranslatePcode.ts";
import interpreter from "./interpreter.ts";

const input = Deno.readTextFile("./test.src");

const parser = new SyntaxAnalysis();
const ast = parser.produceAST(await input);

const tablesym = new TableSymbole(ast.body);

const translatePcode = new TranslatePcode(tablesym.generateTableSymbole(ast.body), ast.body);
translatePcode.generate_pcode(ast.body);
const pcode = translatePcode.get_pcode();

interpreter(pcode);
