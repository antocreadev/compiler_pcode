import SyntaxAnalysis from "./SyntaxAnalysis.ts";
import TableSymbole from "./TableSymbole.ts";
import TranslatePcode from "./TranslatePcode.ts";
import interpreter from "./interpreter.ts";
const testFiles = [
    "imbricatedDoWhile.anto",
    "binaryOpPriorited.anto",
    "originalTest.anto",
  ];
  
  for (const file of testFiles) {

    console.log(`\n`);
    console.log("-".repeat(20)+ ` ${file} ` + "-".repeat(20));
    console.log(`\n`);
    

    const filePath = `./testsPcode/${file}`;
    const input = await Deno.readTextFile(filePath);
  
    const parser = new SyntaxAnalysis();
    const ast = parser.produceAST(input);
    console.log(`Abstract Syntax Tree for ${file}:`);

    console.log(JSON.stringify(ast, null, 4));
  
    const tablesym = new TableSymbole(ast.body).generateTableSymbole(ast.body);
    console.log(`Symboles table ${file}:`);
    console.table(tablesym);
  
    const translatePcode = new TranslatePcode(tablesym, ast.body);
    translatePcode.generate_pcode(ast.body);
    const pcode = translatePcode.get_pcode();
  
    console.log(`p-code machine for ${file}:`);
    console.table(pcode);

    const histo_interpreter = interpreter(pcode);
    console.log(`Historique de l'interpréteur pour ${file}:`);
    console.table(histo_interpreter);
  }