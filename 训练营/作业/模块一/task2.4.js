const fp = require('lodash/fp')
function sanitizeNames(){
  return fp.flowRight(fp.map(fp.flowRight(fp.join('_'),fp.toLower,fp.split(' '))))
}
let arr = ['Hello World']
console.log(sanitizeNames(arr))