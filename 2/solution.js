// --- Day 2: Rock Paper Scissors ---

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
// 1 for Rock, 2 for Paper, and 3 for Scissors
// plus the score for the outcome of the round
// 0 if you lost, 3 if the round was a draw, and 6 if you won
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const matches = {
  'A': 'R',
  'B': 'P',
  'C': 'S',
  'X': 'R',
  'Y': 'P',
  'Z': 'S',
};

const scores = {
  'R': 1,
  'P': 2,
  'S': 3,
};

const wins = ['RS', 'SP', 'PR'];

const new_rules = {
  // draw
  'AY': 'AX',
  'BY': 'BY',
  'CY': 'CZ',

  // lose
  'AX': 'AZ',
  'BX': 'BX',
  'CX': 'CY',

  // win
  'AZ': 'AY',
  'BZ': 'BZ',
  'CZ': 'CX'
};

const pairs_1 = input
  .split('\n')
  .map(str => str.split(' ').map(ch => matches[ch]).reverse().join(''));

const pairs_2 = input
  .split('\n')
  .map(str => str.split(' ').join(''))
  .map(str => new_rules[str])
  .map(str => str.split('').map(ch => matches[ch]).reverse().join(''));

function count_score(pairs) {
  return pairs
    .map(p => {
      const draw = p[0] === p[1];
      const winner = wins.includes(p);

      let score = scores[p[0]];
      score += winner ? 6 : 0;
      score += draw ? 3 : 0;

      return score;
    })
    .reduce((total, n) => total + n);
}

console.log(`part 1: ${ count_score(pairs_1) }`);
console.log(`part 2: ${ count_score(pairs_2) }`);
