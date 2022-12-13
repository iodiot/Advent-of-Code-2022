// --- Day 11: Monkey in the Middle ---

console.time();

class Monkey {
  constructor(lines) {
    const values = (n) => { return lines[n].match(/\d+/g).map(s => +s); }
    const value = (n) => { return values(n)[0]; }

    this.items = values(1);

    if (lines[2].match(/\d+/g)) {
      this.operation = (n) => {
        return lines[2].includes('*') ? n * value(2) : n + value(2);
      };
    } else {
      this.operation = (n) => {
        return lines[2].includes('*') ? n * n : n + n;
      };
    }

    this.test = (n) => { return (n % value(3)) == 0; };
    this.if_true = value(4);
    this.if_false = value(5);

    this.inspected = 0;
  }

  inspect(other_monkeys) {
    for (let item of this.items) {
      // item = Math.floor(this.operation(item) / 3);
      item = this.operation(item);
      other_monkeys[this.test(item) ? this.if_true : this.if_false].items.push(item);

      this.inspected += 1;
    }

    this.items = [];
  }
}

import fs from 'fs';

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n').filter(line => line !== '\r');

const monkeys = [];

const n = Math.floor(lines.length / 6);
let i = 0;

while (i < n) {
  monkeys.push(new Monkey(lines.slice(i * 6, i * 6 + 6)));
  i += 1;
}

for (let round = 0; round < 1; ++round) {
  monkeys.forEach(monkey => monkey.inspect(monkeys));

  if (round % 100 === 0) console.log(round);
}

const inspections = monkeys.map(m => m.inspected);//.sort((a, b) => a < b ? -1 : +1);

// console.log(inspections);

console.log(`part 1: ${ inspections.pop() * inspections.pop() }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();