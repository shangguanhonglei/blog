import Observer from './observer.js'
import Compile from './compile.js'
class Vue {
  /**
   * 构造函数
   * @param {*} options 
   */
  constructor(options){
    var self = this
    this.data = options.data
    this.methods = options.methods
    this.proxy()
    Object.keys(this.methods).forEach(key => {
      this[key] = self.methods[key]
    })
    new Observer(this.data)
    new Compile(options.el, this)
    options.mounted.call(this)
    return this
  }
  /**
   * 将this.data上的数据代理到this上
   */
  proxy(){
    var self = this
    //代理，将data上的数据代理到Vue实例上，方便访问
    Object.keys(this.data).forEach(key => {
      //this[key] = this.data[key]
      Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get: function getter() {
          return self.data[key]
        },
        set: function setter(newVal) {
          self.data[key] = newVal
        }
      })
    })
  }
}
export default Vue