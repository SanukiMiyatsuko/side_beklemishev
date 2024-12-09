export function expand(seq: number[], n: number): number[] {
    const last = seq[seq.length-1];
    if (last === 0) return seq.slice(-1);
    const p = find(seq);
    let gp: number[];
    let bp: number[];
    if (p === null) {
        gp = [];
        bp = seq.slice(0,-1).concat([last-1]);
    } else {
        gp = seq.slice(0,p+1);
        bp = seq.slice(p+1,-1).concat([last-1]);
    }
    let BP: number[] = [];
    for (let i = 0; i < n; i++) {
        BP = BP.concat(bp);
    }
    return gp.concat(BP);
}

function find(seq: number[]): number | null {
    const last = seq[seq.length-1];
    const p1 = parent(seq,seq.length-1);
    if (p1 === null || 2 <= last-seq[p1]) {
        return p1;
    } else {
        const p2 = parent(seq,p1);
        if (p2 === null || 2 <= last-seq[p2]) {
            return p2;
        } else {
            let tp = p2+1
            while (tp < seq.length) {
                if (seq[p2] === seq[tp]) break;
                tp += 1
            }
            return tp;
        }
    }
}

function parent(seq: number[], x: number): number | null {
    let p = x-1;
    while (p > -1) {
        if (lt(seq.slice(p), seq.slice(x))) break;
        p -= 1;
    }
    if (p === -1) return null;
    return p;
}

function lt(seq1: number[], seq2: number[]): boolean {
    if (seq1.length === 0) return seq2.length !== 0;
    if (seq2.length === 0) return false;
    return seq1 < seq2 || (seq1 === seq2 && lt(seq1.slice(1),seq2.slice(1)));
}