// --- Day 14: Regolith Reservoir ---

console.time();

class Cave {
  constructor(has_floor) {
    this.cave = {};
    this.highest_y = 0;
    this.has_floor = has_floor;
  }

  set(x, y, v) {
    this.cave[this.hash(x, y)] = v;
  }

  get(x, y) {
    return this.hash(x, y) in this.cave ? this.cave[this.hash(x, y)] : null;
  }

  blocked(x, y) {
    if (this.has_floor && y === this.highest_y + 2) return true;
    return ['#', 'o'].includes(this.get(x, y));
  }

  hash = (x, y) => { return `${x}-${y}`; }

  spawn_sand() {
    let x = 500, y = 0;

    while (true) {
      const down = this.blocked(x, y + 1);
      const left = this.blocked(x - 1, y + 1);
      const right = this.blocked(x + 1, y + 1);

      if (down && left && right) {
        this.set(x, y, 'o');
        return this.has_floor && (x === 500) && (y === 0);
      }

      y += 1;

      if (down) {
        x += !left ? -1 : +1;
      }

      if (!this.has_floor && y > this.highest_y) return true;
    }
  }

  add_rocks(pattern) {
    for (let i = 1; i < pattern.length; ++i) {
      let sx = pattern[i - 1][0], sy = pattern[i - 1][1];
      const ex = pattern[i][0], ey = pattern[i][1];

      this.highest_y = Math.max(this.highest_y, sy);
      this.highest_y = Math.max(this.highest_y, ey);

      while ((sx !== ex) || (sy !== ey)) {
        this.set(sx, sy, '#');

        sx += Math.sign(ex - sx);
        sy += Math.sign(ey - sy);
      }

      this.set(ex, ey, '#');
    }
  }
}

import fs from 'fs';

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const cave_1 = new Cave(), cave_2 = new Cave(true);

for (const line of lines) {
  const pattern = line.split(' -> ').map(p => p.split(',').map(s => +s));
  cave_1.add_rocks(pattern, true);
  cave_2.add_rocks(pattern, true);
}

let part_1 = 0;
while (true) {
  if (cave_1.spawn_sand()) break;
  part_1 += 1;
}

let part_2 = 0;
while (true) {
  part_2 += 1;
  if (cave_2.spawn_sand()) break;
}

console.log(`part 1: ${ part_1 }`);
console.log(`part 2: ${ part_2 }`);

console.timeEnd();
