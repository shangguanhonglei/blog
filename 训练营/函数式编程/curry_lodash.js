const _ = require('lodash')
function getSum(a,b,c) {
  return a + b + c
}
const curried = _.curry(getSum)
console.log(curried(1,2,3))
console.log(curried(1)(2)(3))

function curry(fn){
  return function curried(...arg){
    if(arg.length < fn.length) {
      return function(){
        return curried(...arg.concat(Array.from(arguments)))
      }
    }
    return fn(...arg)
  }
}
const myCurry = curry(getSum)
console.log(myCurry(1)(3)(5))