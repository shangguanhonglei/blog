module.exports.test = 'A'

const moduleB = require('./moduleB')

console.log('moduleA:',moduleB.test)

module.exports.test = 'AA'
