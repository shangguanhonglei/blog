const _ = require('lodash')
const match = _.curry(function(reg,str){
  return str.match(reg)
})
const haveNum = match(/\d+/g)
const haveSpace = match(/\s+/g)
console.log(haveNum('232fasfa'))
console.log(haveSpace('232f  asfa'))

const filter = _.curry(function(array,fn){
  return array.filter(fn)
})
console.log(filter(['hello world','hello_code'],haveSpace))// output: ['hello world']

const findSpace = filter(['hello world','hello_code'])
console.log(findSpace(haveSpace)) // output: ['hello world']