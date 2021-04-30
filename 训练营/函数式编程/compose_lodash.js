const _ = require('lodash')
const reverse = array=>array.reverse()
const first = (array) => array[0]
const toUpper = (s) =>s.toUpperCase()
// const f = _.flowRight(toUpper,first,reverse)
// console.log(f(['hello','china','world']))
function compose(...args){
  return function(value){
    return args.reverse().reduce((acc,fn)=>{
      return fn(acc)
    },value)
  }
}
// const f = compose(toUpper,first,reverse)
// console.log(f(['hello','china','world']))
const f = compose(toUpper,compose(first,reverse))
console.log(f(['hello','china','world']))