interface Pcode {
    op: string;
    arg: string | null | undefined;
}

const pcode: Array<Pcode> = [];

const translatePcode = (tablesym: any) => {
    pcode.push({ op: "INT", arg: tablesym.length });

    return pcode;
};
