const fp = require('lodash/fp')
//world wild web -> W.W.W
const f = fp.flowRight(fp.join('.'),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '))
console.log(f('world wild web'))