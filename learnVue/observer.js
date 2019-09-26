import Tool from './tool.js.js'
import Publisher from './publisher.js.js'
class Observer {
  constructor(data){
    //如果数据不是对象或者为空，则不进行监听
    if (!Tool.isObject(data)) {
      return
    }
    var pub = new Publisher()
    Object.keys(data).forEach(function (key, index) {
      var value = data[key]
      if (Tool.isObject(value)) {
        Observer(value)
      } else {
        Object.defineProperty(data, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            if (Publisher.target) {
              pub.add(Publisher.target)
            }
            return value
          },
          set: function (newValue) {
            if (value === newValue) {
              return
            }
            value = newValue
            pub.notice()
          }
        })
      }
    })
  }
}
export default Observer