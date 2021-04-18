const some = (array,fn)=>{
  let result = false
  for(let item of array) {
    if(fn(item)) {
      result = true
    }
  }
  return result
}
let res = some([1,2,3,5],(item)=>{
  return item > 4
})
console.log(res)