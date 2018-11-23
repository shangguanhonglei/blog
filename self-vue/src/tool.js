class Tool {
  /**
   * 根据key从JSON对象数据中获取value
   * @param {*} data
   * @param {*} target_key
   */
  static getValueFromObject(data, target_key){
    var target
    if (!Tool.isObject(data)) {
      return
    }
    var dataKeys = Object.keys(data)
    for (var i = 0, len = dataKeys.length; i < len; i++) {
      var item = data[dataKeys[i]]
      if (!Tool.isObject(item)) {
        if (dataKeys[i] === target_key) {
          target = item
          break
        }
      } else {
        target = Tool.getValueFromObject(item, target_key)
      }
    }
    return target
  }
  /**
   * 检测数据是否是Object类型
   * @param {*} data
   */
  static isObject(data){
    return !!(Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).length)
  }
  /**
   * 检测节点是否是元素节点
   * @param {*} node
   */
  static isElementNode(node){
    return !!(node && node.nodeType === 1)
  }
  /**
   * 检测节点是否是文本节点
   * @param {*} node
   */
  static isTextNode(node){
    return !!(node && node.nodeType === 3)
  }
}
export default Tool
