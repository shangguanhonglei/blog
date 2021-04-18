const fp = require('lodash/fp')
function isLastInStock(cars) {
  let fr = fp.flowRight(fp.prop('in_stock'),fp.last)
  return fr(cars)
}
const cars = [{name: 'ab',in_stock: '1'},{name: 'cd',in_stock: '2'}]
let res = isLastInStock(cars)
console.log(res)