function makePower(pow){
  return function(value){
    return Math.pow(value,pow)
  }
}
let pow2 = makePower(2)
let pow3 = makePower(3)
console.log(pow2(10))
console.log(pow2(2))
console.log(pow3(10))
console.log(pow3(2))