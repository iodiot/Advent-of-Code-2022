// --- Day 3: Rucksack Reorganization ---

import fs from 'fs';

function get_priority(ch) {
  const val = ch.charCodeAt(0);
  return val <= 'Z'.charCodeAt(0) ? val - 'A'.charCodeAt(0) + 27 : val - 'a'.charCodeAt(0) + 1;
}

function count_sum(rucksacks) {
  return rucksacks.map(items => {
    const parts = items.split('|');

    const intersect = parts.reduce((a, b) => {
      return a.toString().split('').filter(item => b.split('').includes(item));
    })[0];

    return get_priority(intersect);
  }).reduce((total, n) => total + n);
}

const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const rucksacks_1 = input.map(line => line.slice(0, line.length / 2) + '|' + line.slice(-line.length / 2));

let rucksacks_2 = [];

for (let i = 0; i < input.length; i += 3) {
  rucksacks_2.push(input.slice(i, i + 3).join('|'));
}

console.time();

console.log(`part 1: ${ count_sum(rucksacks_1) }`);
console.log(`part 2: ${ count_sum(rucksacks_2) }`);

console.timeEnd();
