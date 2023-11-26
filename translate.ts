interface Pcode {
    op: string;
    arg: string | null | undefined;
}

export const translatePcode = (tablesym: any, body: any) : any=> {
    let pcode = [] as any;

    let pc = 0;

    if (tablesym.length > 0){
    pc++;

    pcode.push({ op: "INT", arg: tablesym.length });
    }

    const parcours = (body: any) => {
        for (const node of body) {
            if (node.kind === "VariableDeclaration") {
                pc++;
                if (node.initializer.kind=="NumericLiteral"){
                    pcode.push({op : "LDA", arg : tablesym.indexOf(node.identifier.symbol)})
                    pcode.push({op : "LDI", arg : parseInt(node.initializer.value)})
                    pcode.push({op : "STO", arg : null})
                }
                else if (node.initializer.kind=="NativeFunctionCall"){
                    pcode.push({op : "LDA", arg : tablesym.indexOf(node.identifier.symbol)})
                    pcode.push({op : "INN", arg : null})
                }
            }
            if (node.kind === "DoWhileLoop") {
                pc++;
                pcode.push({op : "TEMPO_POINTER_BZE", arg : pc})
            }
            if (node.kind === "Assignment") {
            pc ++;
            pcode.push({op : "LDA", arg : tablesym.indexOf(node.identifier.value)})
            if (node.value.kind === "BinaryExpr"){
                pcode.push({op : "LDA", arg : tablesym.indexOf(node.value.right.symbol)})
                pcode.push({op : "LDV", arg : null})
                pcode.push({op : "LDA", arg : tablesym.indexOf(node.value.left.symbol)})
                pcode.push({op : "LDV", arg : null})
                if (node.value.operator=="+"){
                    pcode.push({op : "ADD", arg : null})
                }
                else if (node.value.operator=="-"){
                    pcode.push({op : "SUB", arg : null})
                }
                else if (node.value.operator=="*"){
                    pcode.push({op : "MUL", arg : null})
                }
                else if (node.value.operator=="/"){
                    pcode.push({op : "DIV", arg : null})
                }

                pcode.push({op : "STO", arg : null})
            }
            }

            if (node.kind === "NativeFunctionCall" && node.functionName == "write") {
                pc++;
                pcode.push({ op: "LDA", arg: tablesym.indexOf(node.arguments[0].symbol) });
                pcode.push({ op: "LDV", arg: null });
                pcode.push({ op: "PRN", arg: null });
            }

            if (Array.isArray(node.body)) {
                if (parcours(node.body)) {
                pcode = pcode.concat(parcours(node.body));
                }
                if (node.kind === "DoWhileLoop") {
                    pcode.push({ op: "LDA", arg: tablesym.indexOf(node.condition.left.symbol) });
                    pcode.push({ op: "LDV", arg: null });
                    pcode.push({ op: "LDI", arg: node.condition.right.value});
                    if (node.condition.operator == "!=") {
                        pcode.push({ op: "EQL", arg: null });
                    }
                    else if (node.condition.operator == "==") {
                        pcode.push({ op: "NEQ", arg: null });
                    }
                    else if (node.condition.operator == ">") {
                        pcode.push({ op: "LSS", arg: null });
                    }
                    else if (node.condition.operator == "<") {
                        pcode.push({ op: "GTR", arg: null });
                    }
                    else if (node.condition.operator == ">=") {
                        pcode.push({ op: "LEQ", arg: null });
                    }
                    else if (node.condition.operator == "<=") {
                        pcode.push({ op: "GEQ", arg: null });
                    }
                }

                let bze = 0
                for (let i = 0; i < pcode.length; i++) {
                    if (pcode[i]?.op === "TEMPO_POINTER_BZE") {
                        pcode.splice(i,1);
                        bze = i;
                    }
                }
                pcode.push({ op: "BZE", arg: bze });
        }
    }
}
    parcours(body);
    pcode.push({ op: "HLT", arg: null });
    return pcode;
}