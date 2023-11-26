import Parser from "./parser.ts";
import { tokenize } from "./lexer.ts";

const parser = new Parser();

const input = Deno.readTextFile("./test.src");
console.log(tokenize(await input));
const ast = parser.produceAST(await input);
console.log(JSON.stringify(ast, null, 3))
