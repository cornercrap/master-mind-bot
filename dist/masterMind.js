"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
class Field {
    constructor(value, digit) {
        this.value = value.toString().split('');
        while (this.value.length < digit)
            this.value.unshift("0");
    }
    get() {
        return this.value.concat();
    }
    answer(value) {
        let answerField = value.get();
        const hit = this.value.filter((v, i) => answerField[i] == v).length;
        let blow = -hit;
        for (let fv of this.value) {
            let idx = answerField.findIndex(v => fv == v);
            if (idx != -1) {
                blow++;
                answerField.splice(idx, 1);
            }
        }
        return { hit, blow: Math.abs(blow) };
    }
    isDuplicated() {
        return this.value.length !== Array.from(new Set(this.value)).length;
    }
    info() {
        console.log(`config:${this.value}`);
    }
}
exports.Field = Field;
