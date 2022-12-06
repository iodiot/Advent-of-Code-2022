// --- Day 6: Tuning Trouble ---

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

function find_start(input, distinct = 4) {
  const chunk = input.slice(0, distinct).split('');

  for (let i = distinct; i < input.length; ++i) {
    if (new Set(chunk).size === distinct) {
      return i;
    }

    chunk.shift();
    chunk.push(input[i]);
  }

  return -1;
}

console.time();

console.log(`part 1: ${ find_start(input) }`);
console.log(`part 2: ${ find_start(input, 14) }`);

console.timeEnd();
