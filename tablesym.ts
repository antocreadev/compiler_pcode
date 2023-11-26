// deno-lint-ignore-file no-explicit-any
const tablesym = (body : Array<any>) : any=> {
    let declarations : any = [];

    for (const element of body) {
        if (element.kind === "VariableDeclaration") {
            declarations.push(element.identifier.symbol);
        } else if (Array.isArray(element.body)) {
            declarations = declarations.concat(tablesym(element.body));
        }
    }
    return declarations;
}
export default tablesym;