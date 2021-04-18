const map = (array,fn)=>{
  let result = []
  for(let item of array) {
    result.push(fn(item))
  }
  return result
}
let res = map([1,2,3,4],(item)=>{
  return item * item
})
console.log(res)