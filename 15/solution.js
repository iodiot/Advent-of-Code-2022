// --- Day 15: Beacon Exclusion Zone ---

console.time();

import fs from 'fs';

function segment_union_length(seg)
{
  const points = seg.map(s => [[s[0], +1], [s[1], -1]])
    .flat()
    .sort((a, b) => a[0] - b[0]);

  let result = 0, counter = 0;

  for (let i = 0; i < points.length; ++i)
  {
    // part 2 only
    if (!counter && i > 0 && points[i][0] - points[i - 1][0] > 1) {
      return points[i][0] - 1;
    }

    if (counter) result += points[i][0] - points[i - 1][0];
    counter += points[i][1];
  }

  return result;
}

function no_beacon_count(report, row) {
  let seg = [];

  for (const r of report) {
    const sx = r[0], sy = r[1], bx = r[2], by = r[3];

    const d = Math.abs(sx - bx) + Math.abs(sy - by);
    const dd = d - Math.abs(sy - row);

    if (dd >= 0) {
      seg.push([sx - dd, sx + dd]);
    }
  }

  return segment_union_length(seg);
}

const report = fs.readFileSync('./input.txt', 'utf8').trim()
  .split('\n')
  .map(l => l.match(/-?\d+/g).map(s => +s));

const max_x =  Math.max(...report.map(r => r[0]));
const max_y =  Math.max(...report.map(r => r[1]));

let tuning_freq = -1;

for (let y = 0; y <= max_y; ++y) {
  const x = no_beacon_count(report, y);

  if (x <= max_x) {
    tuning_freq = x * 4000000 + y;
    break;
  }
}

console.log(`part 1: ${ no_beacon_count(report,10) }`);
console.log(`part 2: ${ tuning_freq }`);

console.timeEnd();
