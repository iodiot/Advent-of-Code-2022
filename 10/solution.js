// --- Day 10: Cathode-Ray Tube ---

console.time();

import fs from 'fs';

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const interesting = [20, 60, 100, 140, 180, 220];
let reg = 1, pos = 0, cycle = 0, strength = 0;

const sw = 40, sh = 6;
const screen = [...new Array(sh)].map(_ => [...new Array(sw)].map(_ => '░'));

while (pos < lines.length) {
  const line = lines[pos];
  const n = line === 'noop' ? 1 : 2;

  for (let i = 0; i < n; ++i) {
    // time to draw on screen
    if ([reg - 1, reg, reg + 1].includes(cycle % sw)) {
      const draw_x = cycle % sw, draw_y = Math.floor(cycle / sw);
      screen[draw_y][draw_x] = '▓';
    }

    cycle += 1;

    if (interesting.includes(cycle)) {
      strength += reg * cycle;
    }

    // time to add value
    if (n > 1 && i === n - 1) {
      reg += +line.split(' ')[1];
    }
  }

  pos += 1;
}

console.log(`part 1: ${ strength }`);
console.log(`part 2:\n${ screen.map(line => line.join('')).join('\n') }`);

console.timeEnd();
