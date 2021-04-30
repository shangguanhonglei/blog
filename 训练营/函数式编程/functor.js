class Functor {
  //静态方法用于实例化
  static of(value){
    return new Functor(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return Functor.of(fn(this._value))
  }

}
const res = Functor.of(5).map(x=>x+1).map(x=>x * 3)
console.log(res) //打印一个Functor对象，其中this._value = 18