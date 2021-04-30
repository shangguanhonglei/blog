const fs = require('fs')
const fp = require('lodash/fp')
// IO Monad
class IO {
  static of(value){
    return new IO(function(){
      return value
    })
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return new IO(fp.flowRight(fn,this._value))
  }
  //当value值为函数时，直接返回函数执行结果
  join(){
    return this._value()
  }
  //当传入的函数返回的是值调用map，返回的是IO函子调用flatMap
  flatMap(fn){
    return this.map(fn).join()
  }
}
let readFile = function(filename){
  return new IO(function(){
    return fs.readFileSync(filename,'utf-8')
  })
}
let print = function(x){
  return new IO(function(){
    console.log(x)
    return x
  })
}
let r = readFile('package-lock.json')
.map(x=>x.toUpperCase()) //读完文件全部转为大写
.flatMap(print) //对于返回IO函子对象的函数调用flatMap
.join()
console.log(r)