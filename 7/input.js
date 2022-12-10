import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const disk = {};
let path = [];

input.split('\n').forEach(line => {
  if (line.startsWith('$ cd')) {
    const dir = line.slice(5, line.length);

    if (dir === '..') {
      path.pop();
    } else {
      path.push(dir);
    }
  } else if (line.startsWith('$ ls')) {
  } else {
    const tokens = line.split(' ');

    const joined = path.join('-');

    if (!(joined in disk)) {
      disk[joined] = [];
    }

    disk[joined].push(tokens[0] === 'dir' ? tokens[1] : +tokens[0]);
  }
});

export { disk };