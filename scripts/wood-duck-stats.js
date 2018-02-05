#!/usr/bin/env node

const EOL = require('os').EOL;

let input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  input += chunk;
});
process.stdin.on('end', function() {
  process.stdout.write(
    JSON.stringify(processWoodDuckStats(JSON.parse(input)), null, '    ')
  );
  process.stdout.write(EOL);
});

function uniq(arr, aggr = []) {
  return arr.reduce((acc, d) => (acc.includes(d) ? acc : [...acc, d]), aggr);
}

function isModuleReactWoodDuck(name) {
  return name === './node_modules/react-wood-duck/index.js';
}

function processWoodDuckStats(stats) {
  return stats.modules
    .filter(({ name }) => isModuleReactWoodDuck(name))
    .map(({ usedExports }) => usedExports)
    .reduce((acc, mods) => uniq(uniq(mods), acc), []);
}
