// --- Day 7: No Space Left On Device ---

console.time();

import { disk } from './input.js';

// out value for traverse(), bad
let lim_size = 0;

function traverse(disk, path, needs_space = 0) {
  let size = 0;

  disk[path].forEach(token => {
    size += Number.isInteger(token) ? token : traverse(disk, `${path}-${token}`, needs_space);
  });

  lim_size += size <= 100000 ? size : 0;

  return size
}

traverse(disk, '/');

console.log(`part 1: ${ lim_size }`);

console.timeEnd();
