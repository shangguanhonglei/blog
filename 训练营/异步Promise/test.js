const MyPromise = require('./mypromise')
// MyPromise.resolve(10).then((value)=>{
//   console.log(value)
// })
// MyPromise.resolve(new MyPromise((resolve,reject)=>{
//   resolve('p1')
// })).then((value)=>{
//   console.log(value)
// })

let p1 = new MyPromise((resolve,reject)=>{
  reject('p1:失败')
})
let p2 = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    reject('p2')
  },3000)
})
p1.then((val)=>{console.log(val)}).catch((reason)=>{
  console.log(reason)
})
// MyPromise.all(['a',p1,p2,'b']).then((val)=>{
//   console.log(val)
// })
// p1.finally(()=>{
//   console.log('111')
//   return p2
// }).then((val)=>{
//   console.log(val)
// })
