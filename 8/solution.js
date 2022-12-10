// --- Day 8: Treetop Tree House ---

console.time();

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const grid = input.split('\n').map(str => str.split('').map(ch => +ch));

function view_tree(grid, x, y) {
  const dirs = [[0, -1], [0, +1], [-1, 0], [+1, 0]];

  let total_visible = false, total_score = 1;

  for (let d of dirs) {
    let cx = x + d[0], cy = y + d[1], visible = true, score = 0;

    while (cx >= 0 && cy >= 0 && cx < grid.length && cy < grid.length && visible) {
      if (grid[cy][cx] >= grid[y][x]) {
        visible = false;
      }

      cx += d[0];
      cy += d[1];
      score += 1;
    }

    total_visible ||= visible;
    total_score *= score;
  }

  return {
    'visible': total_visible,
    'score': total_score
  };
}

let visible_count = 0, max_scenic_score = 0;

for (let y = 0; y < grid.length; ++y) {
  for (let x = 0; x < grid.length; ++x) {
    const ret = view_tree(grid, y, x);

    visible_count += ret['visible'] ? +1 : 0;
    max_scenic_score = Math.max(max_scenic_score, ret['score']);
  }
}

console.log(`part 1: ${ visible_count }`);
console.log(`part 2: ${ max_scenic_score }`);

console.timeEnd();