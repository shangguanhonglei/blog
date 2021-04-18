function forEach(array,fn){
  for(let i=0;i < array.length; i++) {
      fn(array[i])
  }
}
forEach([1,2,3,4],(item)=>{
  console.log(item)
})