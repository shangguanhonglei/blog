import Publisher from './publisher.js'
class Subscribe{
  /**
   * 构造函数
   * @param {*} vm 
   * @param {*} exp 
   * @param {*} cb 
   */
  constructor(vm, exp, cb){
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()
  }
  /**
   * 订阅者更新
   */
  update(){
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if (value === oldVal) {
      return
    }
    this.value = value
    this.cb.call(this.vm, value, oldVal)
  }
  /**
   * 获取监听器监听到的值
   */
  get(){
    Publisher.target = this
    var value = this.vm.data[this.exp]
    Publisher.target = null
    return value
  }
}
export default Subscribe