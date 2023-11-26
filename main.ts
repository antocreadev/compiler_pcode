import Parser from "./parser.ts";
import { tokenize } from "./lexer.ts";
import tablesym from "./tablesym.ts";

const parser = new Parser();

const input = Deno.readTextFile("./test.src");
// console.log(tokenize(await input));
const ast = parser.produceAST(await input);
// console.log(JSON.stringify(ast, null, 3))

const allvar = tablesym(ast.body);
console.log(allvar)

