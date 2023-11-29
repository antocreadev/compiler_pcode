export const interpreter = (stack, pcode) => {
    const historique = []
    let PC = 0; // pointeur d'instruction 
    while (pcode[PC].op !== "HLT") {
      // console.log(pcode[PC].op);
      const operation = pcode[PC].op;
      const argument = pcode[PC].arg;
      switch (operation) {
        case "INT":
          stack.int(argument);
          break;
        case "LDA":
          stack.lda(argument);
          break;
        case "INN":
          stack.inn();
          break;
        case "LDV":
          stack.ldv();
          break;
        case "ADD":
          stack.add();
          break;

        case "SUB":
          stack.sub();
          break;
        case "MUL":
          stack.mul();
          break;
        case "DIV":
          stack.div();
          break;
        case "NEQ":
          stack.neq();
          break;
        case "GTR":
          stack.gtr();
          break;
        case "LSS":
          stack.lss();
          break;
        case "LEQ":
          stack.leq();
          break;
        case "GEQ":
          stack.geq();
          break;
          
        case "STO":
          stack.sto();
          break;
        case "LDI":
          stack.ldi(argument);
          break;
        case "EQL":
          stack.eql();
          break;
        case "PRN":
        stack.prn();
        break;

        case "BZE":
          if (stack.value.pop() === 0) {
            PC = argument - 1;
          }
          break;

        case "BRN":
            PC = argument - 1;
          break;
      }
      PC++;
      // Avant chaque opération, enregistrez l'état actuel de la pile dans l'historique
      historique.push([...stack.value]);
    }
    return historique
  };


export default interpreter;