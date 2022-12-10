// --- Day 7: No Space Left On Device ---

console.time();

import { disk } from './input.js';

// out value for traverse(), bad
let min_dir_size_to_del = Number.MAX_VALUE;

function traverse(disk, path, needs_space = 0) {
  let size = 0;

  disk[path].forEach(token => {
    size += Number.isInteger(token) ? token : traverse(disk, `${path}-${token}`, needs_space);
  });

  if (needs_space > 0 && size >= needs_space) {
    min_dir_size_to_del = Math.min(min_dir_size_to_del, size);
  }

  return size
}

const used_space = traverse(disk, '/');
const unused_space = 70000000 - used_space;
const needs_space = Math.abs(unused_space - 30000000);

traverse(disk, '/', needs_space);

console.log(`part 2: ${ min_dir_size_to_del }`);

console.timeEnd();
