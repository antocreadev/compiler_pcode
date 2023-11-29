import Parser from "./Parser.ts";
import TableSymbole from "./TableSymbole.ts";
import TranslatePcode from "./TranslatePcode.ts";
import { tokenize } from "./lexer.ts";

import Stack from "./stack.js";
import interpreter from "./interpreter.js";

const input = Deno.readTextFile("./test.src");

const parser = new Parser();
const ast = parser.produceAST(await input);

const tablesym = new TableSymbole(ast.body);
const translatePcode = new TranslatePcode(tablesym.generateTableSymbole(ast.body), ast.body);
translatePcode.generate_pcode(ast.body);
const pcode = translatePcode.get_pcode();
// console.table(pcode);
const stack = new Stack();
interpreter(stack, pcode);
