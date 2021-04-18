module.exports.test = 'B'

const moduleA = require('./moduleA')

console.log('moduleB:',moduleA.test)

module.exports.test = 'BB'
