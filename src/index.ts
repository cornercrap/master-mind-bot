import { Field, Answer } from "./masterMind";

type Hint = {
  field: Field;
  answer: Answer;
}

export { Field };

export default class MsterMindBot {
  private correct: Field;
  private candidate: Candidate;
  constructor(value: number | string, private digit = 4, private level = 1, private duplicate = false) {
    this.correct = new Field(value, this.digit);
    this.candidate = new Candidate(this.digit, this.duplicate);
  }

  execute(): Hint {
    let field = this.candidate.getRandomField();
    let answer = this.correct.answer(field);
    this.candidate.calculate({ field, answer });
    if (this.level == 2) {
      field = this.candidate.getRandomField();
      answer = this.correct.answer(field);
      this.candidate.calculate({ field, answer });
    }
    return { field, answer };
  }

  isOver() {
    return this.candidate.isOver();
  }

  getPotential() {
    return this.candidate.getPotential();
  }

  getHints() {
    return this.candidate.getHints();
  }

  info() {
    console.log(`digit：${this.digit}`, `level：${this.level}`, `duplivated：${this.duplicate}`);
    this.correct.info();
    this.candidate.info();
  }
}

class Candidate {
  private fields: Field[] = [];
  private hints: Hint[] = [];

  constructor(digit: number, duplicate: boolean) {
    const max = Math.pow(10, digit);
    for (let i = 0; i < max; i++) {
      const field = new Field(i, digit);
      if (!duplicate && field.isDuplicated()) continue;
      this.fields.push(field);
    }
  }

  getRandomField() {
    const index = Math.floor(Math.random() * Math.floor(this.fields.length));
    return this.fields[index];
  }

  calculate(hint: Hint) {
    this.hints.push(hint);
    let beforeLength = this.fields.length;
    for (let i = beforeLength - 1; i >= 0; i--) {
      const answer = this.fields[i].answer(hint.field);
      if (hint.answer.hit != answer.hit || hint.answer.blow != answer.blow) {
        this.fields.splice(i, 1);
      }
    }
  }

  isOver() {
    return this.fields.length === 1
  }

  getPotential() {
    return this.fields.length
  }

  getHints() {
    return this.hints;
  }

  info() {
    console.log(`potential:${this.fields.length}`);
    if (this.hints.length > 0) {
      for (let hint of this.hints) {
        console.log(`hint:${hint.field.get()}`, `hit:${hint.answer.hit}`, `blow:${hint.answer.blow}`);
      }
    }
  }
}