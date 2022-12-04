// --- Day 4: Camp Cleanup ---

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const lines = input.split('\n').map(line => line.match(/\d+/g).map(s => +s));

const fully = lines.filter(line => {
  return (line[0] >= line[2] && line[1] <= line[3]) || (line[2] >= line[0] && line[3] <= line[1]);
}).length;

const not_fully = lines.filter(line => {
  return (line[2] <= line[1]) && (line[3] >= line[0]);
}).length;

console.time();

console.log(`part 1: ${ fully }`);
console.log(`part 2: ${ not_fully }`);

console.timeEnd();