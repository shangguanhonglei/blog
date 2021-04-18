const every = (array,fn)=>{
  let result = true
  for(let item of array) {
    if(!fn(item)) {
      result = false
    }
  }
  return result
}
let res = every([1,2,4,10,4],(item)=>{
  return item < 10
})
console.log(res)