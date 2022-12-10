// --- Day 9: Rope Bridge ---

console.time();

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const moves = input.split('\n').map(line => {
  const tokens = line.split(' ');
  const d = tokens[0], n = +tokens[1];

  return [
    (d === 'L' || d === 'R') ? (d === 'R' ? +n : -n) : 0,
    (d === 'U' || d === 'D') ? (d === 'D' ? +n : -n) : 0,
  ];
});

function simulate_rope(moves, knots = 2) {
  const rope = [...new Array(knots)].map(_ => [0, 0]);
  const visited = { '0|0': true };
  const movesClone = JSON.parse(JSON.stringify(moves));

  for (let move of movesClone) {
    while (Math.abs(move[0]) > 0 || Math.abs(move[1]) > 0) {
      for (let i = 0; i < rope.length - 1; ++i) {
        const head = rope[i];
        const tail = rope[i + 1];

        if (i === 0) {
          head[0] += Math.sign(move[0]);
          head[1] += Math.sign(move[1]);
        }

        const d = Math.abs(head[0] - tail[0]) + Math.abs(head[1] - tail[1]);
        const same_x = head[0] === tail[0], same_y = head[1] === tail[1];
        const adjacent = ((same_x || same_y) && d <= 1) || (!same_x && !same_y && d === 2);

        if (!adjacent) {
          tail[0] += Math.sign(head[0] - tail[0]);
          tail[1] += Math.sign(head[1] - tail[1]);
        }

        if (i === rope.length - 2) {
          visited[tail.join('|')] = true;
        }
      }

      move[0] -= Math.sign(move[0]);
      move[1] -= Math.sign(move[1]);
    }
  }

  return Object.keys(visited).length;
}

console.log(`part 1: ${ simulate_rope(moves, 2) }`);
console.log(`part 2: ${ simulate_rope(moves, 10) }`);

console.timeEnd();