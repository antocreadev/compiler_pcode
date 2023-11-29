import Parser from "./parser.ts";
import { tokenize } from "./lexer.ts";
import tablesym from "./tablesym.ts";
import {translatePcode} from "./translate.ts";
import Stack from "./stack.js";
import interpreter from "./interpreter.js";
const parser = new Parser();
const input = Deno.readTextFile("./test.src");
const ast = parser.produceAST(await input);
const table_sym = tablesym(ast.body);
const pcode = (translatePcode(await table_sym, ast.body))
console.log(await pcode)
const stack = new Stack();
const result = interpreter(stack, await pcode);
// console.log(result);

const tablesym = new TableSymbole(ast.body);
const translatePcode = new TranslatePcode(tablesym.generateTableSymbole(ast.body), ast.body);
console.log(console.log(JSON.stringify(ast, null, 4)));
translatePcode.generate_pcode(ast.body);
console.table(translatePcode.get_tablesym());
console.table(translatePcode.get_pcode());