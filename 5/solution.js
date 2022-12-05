// --- Day 5: Supply Stacks ---

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

let stacks = {};

input.split('\n').forEach(line => {
  let matches = [...line.matchAll(/[A-Z]/g)];

  matches.forEach((match) => {
    const i = (match.index - 1) / 4 + 1;

    if (!(i in stacks)) {
      stacks[i] = [];
    }

    stacks[i].push(match[0]);
  });
});

const moves = input.split('\r\n\r\n')[1]
  .trim()
  .split('\r\n')
  .map(str => str.match(/\d+/g).map(str => +str));

function arrange_crates(stacks, moves, reversed = true) {
  const _stacks = JSON.parse(JSON.stringify(stacks)); // clone

  for (let move of moves) {
    let n = move[0], from = move[1], to = move[2], t = [];

    while (n-- > 0) {
      t.push(_stacks[from].shift());
    }

    _stacks[to] = (reversed ? t.reverse() : t).concat(_stacks[to]);
  }

  return Object.values(_stacks).map(v => v.shift()).join('');
}

console.time();

console.log(`part 1: ${ arrange_crates(stacks, moves, false) }`);
console.log(`part 2: ${ arrange_crates(stacks, moves) }`);

console.timeEnd()