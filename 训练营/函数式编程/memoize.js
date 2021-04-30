const _ = require('lodash')
function getArea(r){
  console.log(r)
  return Math.PI * r * r
}
// const getAreaWithMemoize = _.memoize(getArea)
// console.log(getAreaWithMemoize(5))
// console.log(getAreaWithMemoize(5))
// console.log(getAreaWithMemoize(6))
// console.log(getAreaWithMemoize(6))
// console.log(getAreaWithMemoize(7))
function memoize(fn){
  const cache = {}
  return function(){
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn,arguments)
    return cache[key]
  }
}
const getAreaWithMemoize = memoize(getArea)
console.log(getAreaWithMemoize(5))
console.log(getAreaWithMemoize(5))
console.log(getAreaWithMemoize(6))
console.log(getAreaWithMemoize(6))
console.log(getAreaWithMemoize(7))