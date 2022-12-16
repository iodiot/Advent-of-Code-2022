// --- Day 14: Regolith Reservoir ---

console.time();

class Grid {
  constructor() {
    this.grid = {};
  }

  set(x, y, v) {
    this.grid[this.hash(x, y)] = v;
  }

  get(x, y) {
    return this.grid.includes(this.hash(x, y)) ? this.grid[this.hash(x, y)] : null;
  }

  hash = (x, y) => { return `${x}-${y}`; }

  spawn_sand() {
    let x = 500, y = 0;

    const below = this.get(x, y + 1);

    while (true) {
      if (below === '#') {
        this.set(x, y, 'o');
      } else if (below === 'o')
    }
  }
}

import fs from 'fs';

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const grid = new Grid();

for (const line of lines) {
  const pairs = line.split(' -> ').map(p => p.split(',').map(s => +s));

  for (let i = 1; i < pairs.length; ++i) {
    let sx = pairs[i - 1][0], sy = pairs[i - 1][1];
    const ex = pairs[i][0], ey = pairs[i][1];

    while ((sx !== ex) || (sy !== ey)) {
      grid.set(sx, sy, '#');

      sx += Math.sign(ex - sx);
      sy += Math.sign(ey - sy);
    }

    grid.set(ex, ey, '#');
  }
}

console.log(grid.grid);

console.log(`part 1: ${ 0 }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();