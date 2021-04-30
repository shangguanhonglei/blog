const _ = require('lodash')
//NEVER SAY DIE -> never-say-die
// const log = value =>{ 
//   console.log(value)
//   return value
// }
const trace = _.curry((tag,v)=>{
  console.log(tag,v)
  return v
})
const split = _.curry((sep,str)=>{return str.split(sep)})
const join = _.curry((sep,array)=>{return array.join(sep)})
const map = _.curry((fn,array)=>{return _.map(array,fn)})
//_.toLower()
const f = _.flowRight(join('-'),trace('map'),map(_.toLower),trace('split'),split(' '))

console.log(f('NEVER SAY DIE'))