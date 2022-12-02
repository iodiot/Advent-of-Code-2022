// --- Day 1: Calorie Counting ---

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const sorted = input
    .split('\n\n')
    .map(str => str.split('\n').map(n => parseInt(n)).reduce((total, n) => total + n))
    .sort((a, b) => { return a < b ? -1 : +1 });

console.log(`part 1: ${ sorted.slice(-1) }`);
console.log(`part 2: ${ sorted.slice(-3).reduce((total, n) => total + n) }`);

