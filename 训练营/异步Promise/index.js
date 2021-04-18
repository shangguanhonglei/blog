const MyPromise = require('./mypromise')
const promise = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('成功')
  },2000)
  //throw new Error('excutor error')
  //resolve('成功')
  //reject('失败')
})
promise.then((val)=>{
  console.log(val)
  return '2222'
  //throw new Error('then error')
},(reason)=>{
  console.log(reason)
  return 122
}).then((val)=>{
  console.log(val)
},(reason)=>{
  //console.log(reason)
})

// .then((val)=>{
//   console.log(val)
// },(reason)=>{
//   console.log(reason.message)
// })
// p1 = promise.then((val)=>{
//   console.log(val)
//   //return other()
//   return p1
  
// })

// p1.then((val)=>{
//   console.log(val)
// },(reason)=>{
//   console.log(reason.message)
// })
// function other(){
//   return new MyPromise((resolve,reject)=>{
//     resolve('abc')
//   })
// }
// promise.then((val)=>{
//   console.log(1,val)
// })
// promise.then(val=>{
//   console.log(2,val)
// })
// promise.then((val)=>{
//   console.log(3,val)
// })