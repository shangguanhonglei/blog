const fp = require('lodash/fp')
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
}
const r = IO.of(process).map(p=>p.execPath)
console.log(r._value())