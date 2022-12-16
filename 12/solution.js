// --- Day 12: Hill Climbing Algorithm ---

console.time();

import fs from 'fs';

class Path {
  constructor(x, y, steps = 0) {
    this.steps = steps;
    this.x = x;
    this.y = y;
  }
}

const map = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n')

const queue_1 = [];
const queue_2 = [];

for (let y = 0; y < map.length; ++y) {
  for (let x = 0; x < map[0].length; ++x) {
    if (map[y][x] === 'S') {
      queue_1.push(new Path(x, y));
      queue_2.push(new Path(x, y));
    } else if (map[y][x] === 'a') {
      queue_2.push(new Path(x, y));
    }
  }
}

function traverse(queue) {
  const dirs = [[0, -1], [0, +1], [-1, 0], [+1, 0]];
  const dp = {};

  while (queue.length > 0) {
    const path = queue.pop();
    const hash = [path.x, path.y].join('-');

    if (!(hash in dp)) {
      dp[hash] = path.steps;
    } else if (dp[hash] <= path.steps) {
      continue;
    }

    if (map[path.y][path.x] === 'E') {
      return path.steps;
    }

    const elevation = map[path.y][path.x] === 'S' ? 'a'.charCodeAt(0) : map[path.y][path.x].charCodeAt(0);

    for (const dir of dirs) {
      const nx = path.x + dir[0], ny = path.y + dir[1];

      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) continue;

      const new_elevation = map[ny][nx] === 'E' ? 'z'.charCodeAt(0) : map[ny][nx].charCodeAt(0);

      if (new_elevation - elevation > 1) continue;

      queue.unshift(new Path(nx, ny, path.steps + 1));
    }
  }

  return -1;
}

console.log(`part 1: ${ traverse(queue_1) }`);
console.log(`part 2: ${ traverse(queue_2) }`);

console.timeEnd();
