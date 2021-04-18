// function makeFn() {
//   let msg = 'abcd'
//   return function(){
//       console.log(msg)
//   }
// }
// const fn = makeFn()
// fn()
function once(fn){
  let done = false
  return function(){
    if(!done){
      done = true
      return fn.apply(this,arguments)
    }
  }
}
let pay = once((a,b)=>{
  let sum = a + b
  console.log(sum)
  return sum
})
pay(1,2) //仅执行一次
pay(3,4)
pay(5,6)