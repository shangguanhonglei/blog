const fp = require('lodash/fp')
let _average = (xs)=>{
  return fp.reduce(fp.add,0,xs) / xs.length
}
let _dollor = (cars)=>{
  return fp.map((car)=>{
    return car.dollar_value
  },cars)
}
function compose(f,g){
  return function(value){
      return f(g(value))
  }
}
const cars = [{name: 'ab',in_stock: '1',dollar_value: 1000},{name: 'cd',in_stock: '2',dollar_value: 2000}]
let f = compose(_average,_dollor)
let res = f(cars)
console.log(res)