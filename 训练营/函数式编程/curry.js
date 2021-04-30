function checkAge(min){
  return function(age){
    return age > min
  }
}
let checkAge18 = checkAge(18)
console.log(checkAge18(22)) //true
console.log(checkAge18(16)) //false
