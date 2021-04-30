class MayBe {
  //静态方法用于实例化
  static of(value){
    return new MayBe(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }
  isNothing(){
      return this._value===null || this._value===undefined
  }
}
const res = MayBe.of(5).map(x=>x+1).map(x=>x * 3)
console.log(res)