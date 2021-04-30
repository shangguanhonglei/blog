const { compose,curry } = require('folktale/core/lambda')
const {first,toUpper, filter} = require('lodash')
// curry函数的第一个参数表示回调函数参数个数
// const f = curry(2,(x,y)=>{
//   return x + y
// })
// console.log(f(1,2))
// console.log(f(1)(2))
// compose函数表示函数组合和lodash中的flowRight类似
const f = compose(toUpper,first)
console.log(f(['one','two','three']))