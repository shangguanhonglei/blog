const _ = require('lodash')
console.log(_.map(['23','8','10'],parseInt)) // [ 23, NaN, 2 ]

const fp = require('lodash/fp')
console.log(fp.map(parseInt,['23','8','10'])) //[ 23, 8, 10 ]