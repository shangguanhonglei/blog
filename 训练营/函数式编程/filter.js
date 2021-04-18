function filter(array,fn) {
  let result = []
  for(let i=0; i< array.length; i++) {
    if(fn(array[i])) {
      result.push(array[i])
    }
  }
  return result
}
let res = filter([1,2,3,4],(item)=>{
  return item % 2 === 0
})
console.log(res)