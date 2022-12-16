// --- Day 13: Distress Signal ---

console.time();

import fs from 'fs';

const packets = fs.readFileSync('./input.txt', 'utf8').trim()
  .split('\n')
  .filter(s => s !== '')
  .map(s => JSON.parse(s));

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) return 0;
    return left < right ? -1 : +1;
  } else {
    if (Number.isInteger(left)) left = [left];
    if (Number.isInteger(right)) right = [right];

    if (left.length === 0 && right.length === 0) return 0;
    if (left.length === 0 && right.length !== 0) return -1;
    if (right.length === 0 && left.length !== 0) return +1;

    const r = compare(left[0], right[0]);

    if (r !== 0) {
      return r;
    } else {
      return compare(left.slice(1), right.slice(1));
    }
  }
}

let sum = 0;

for (let i = 0; i < packets.length - 1; i += 2) {
  const r = compare(packets[i], packets[i + 1]);

  if (r <= 0) {
    sum += i / 2 + 1;
  }
}

console.log(`part 1: ${ sum }`);

const div_1 = JSON.parse('[[2]]');
const div_2 = JSON.parse('[[6]]');

packets.push(div_1);
packets.push(div_2);

const sorted = packets.sort((a, b) => compare(a, b));

const decoder_key = (sorted.indexOf(div_1) + 1) * (sorted.indexOf(div_2) + 1);

console.log(`part 2: ${ decoder_key }`);

console.timeEnd();
