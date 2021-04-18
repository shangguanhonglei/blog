const PENDING = 'pending' //等待
const FULFILLED = 'fulfilled' //成功
const REJECTED = 'rejected' //失败
class MyPromise {
  constructor(executor){
    try {
      executor(this.resolve,this.reject)
    } 
    catch(e) {
      this.reject(e)
    }
    
  }
  //状态初始为等待
  status = PENDING
  //成功返回值
  value = undefined
  //失败返回值
  reason = undefined
  //成功回调
  successCallback = []
  //失败回调
  failCallback = []
  resolve = value =>{
    if(this.status !== PENDING) return
    //将状态改为成功
    this.status = FULFILLED
    //保存成功之后的值
    this.value = value
    //this.successCallback && this.successCallback(this.value)
    while(this.successCallback.length) {
      this.successCallback.shift()()
    }
  }
  reject = reason =>{
    if(this.status !== PENDING) return
    //将状态改为失败
    this.status = REJECTED
    //保存失败之后的值
    this.reason = reason
    //this.failCallback && this.failCallback(this.reason)
    while(this.failCallback.length) {
      this.failCallback.shift()()
    }
  }
  then(successCallback,failCallback){
    //then函数如果没有参数默认返回上一个promise的参数
    successCallback = successCallback ? successCallback : value=>value
    failCallback = failCallback ? failCallback : reason=>reason
    //链式调用
    let promise2 = new MyPromise((resolve,reject)=>{
      if(this.status === FULFILLED) {
        //需要编程异步代码，否则promise2执行过程中是获取不到promise2实例的
        setTimeout(()=>{
          try {
            let x = successCallback(this.value)
            //如果then返回一个promise对象，将值传下去，步骤如下
            //判断x是普通值还是promise对象
            //如果是普通值直接调用resolve
            //如果是promise，查看promise返回的结果
            //在根据返回的结果决定调用resolve还是reject
            resolvePromise(promise2,x,resolve,reject)
          } catch(e){
            reject(e)
          }
          
        })
      }
      else if(this.status === REJECTED) {
        //需要编程异步代码，否则promise2执行过程中是获取不到promise2实例的
        setTimeout(()=>{
          try {
            let x = failCallback(this.reason)
            //如果then返回一个promise对象，将值传下去，步骤如下
            //判断x是普通值还是promise对象
            //如果是普通值直接调用resolve
            //如果是promise，查看promise返回的结果
            //在根据返回的结果决定调用resolve还是reject
            resolvePromise(promise2,x,resolve,reject)
          } catch(e){
            reject(e)
          }
        })
      }else {
        //等待,异步
        //将成功回调和失败回调存储起来
        this.successCallback.push(()=>{
          //需要编程异步代码，否则promise2执行过程中是获取不到promise2实例的
          setTimeout(()=>{
            try {
              let x = successCallback(this.value)
              //如果then返回一个promise对象，将值传下去，步骤如下
              //判断x是普通值还是promise对象
              //如果是普通值直接调用resolve
              //如果是promise，查看promise返回的结果
              //在根据返回的结果决定调用resolve还是reject
              resolvePromise(promise2,x,resolve,reject)
            } catch(e){
              reject(e)
            }
            
          })
        })
        this.failCallback.push(()=>{
          //需要编程异步代码，否则promise2执行过程中是获取不到promise2实例的
          setTimeout(()=>{
            try {
              let x = failCallback(this.reason)
              //如果then返回一个promise对象，将值传下去，步骤如下
              //判断x是普通值还是promise对象
              //如果是普通值直接调用resolve
              //如果是promise，查看promise返回的结果
              //在根据返回的结果决定调用resolve还是reject
              resolvePromise(promise2,x,resolve,reject)
            } catch(e){
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
  finally(callback){
    return this.then(value=>{
      return MyPromise.resolve(callback()).then(()=>value)
    },reason=>{
      return MyPromise.resolve(callback()).then(()=>{throw reason})
    })
  }
  catch(failCallback){
    return this.then(undefined,failCallback)
  }
  static all(array){
    let result = []
    let index = 0
    return new MyPromise((resolve,reject)=>{
      function addData(key,value){
        result[key] = value
        index ++
        if(index === array.length) {
          resolve(result)
        }
      }
      for(let i = 0; i< array.length; i++) {
          let current = array[i]
          if(current instanceof MyPromise) {
            current.then(value=>addData(i,value),reason=>reject(reason))
          }else {
            addData(i,current)
          }
      }
      
    })
  }
  static resolve(value){
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve=>resolve(value))
  }
}
function resolvePromise(promise2,x,resolve,reject){
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise) {
    //x.then(value=>resolve(value),reason=>reject(reason))
    x.then(resolve,reject)
  }else {
    //将值传到下一个then
    resolve(x)
  }
}
module.exports = MyPromise