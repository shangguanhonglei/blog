class Left {
  constructor(value){
    this._value = value
  }
  static of(value){
    return new Left(value)
  }
  map(fn){
    return this
  }
}
class Right {
  constructor(value){
    this._value = value
  }
  static of(value) {
    return new Right(value)
  }
  map(fn) {
    return Right.of(fn(this._value))
  }
}
// console.log(Left.of(21).map(x=>x+2)) //21
// console.log(Right.of(21).map(x=>x+2)) //23
const parseJSON = str =>{
  try {
    return Right.of(str).map(str=>JSON.parse(str))
  }
  catch(e){
    return Left.of({error: e.message})
  }
}
//console.log(parseJSON('{"name": "xiaoming"}'))
//console.log(parseJSON('{name}'))
console.log(parseJSON('{"name": "xiaoming"}').map(x=>x.name.toUpperCase()))