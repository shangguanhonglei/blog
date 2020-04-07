import Tool from './tool.js.js'
import Subscribe from './subscribe.js.js'
class Compile {
  /**
   * 构造函数
   * @param {*} node
   * @param {*} data
   */
  constructor(node, data){
    this.data = data
    this.node = document.querySelector(node)
    this.flag = null
    if (this.node) {
      this.frag = this.nodeToFragment(this.node)
      this.compileElement(this.frag)
      this.node.appendChild(this.frag)
    } else {
      console.log('dom元素不存在')
    }
  }
  /**
   * 将dom节点添加到frament中
   * @param {*} node
   */
  nodeToFragment(node){
    var frament = document.createDocumentFragment()
    var child = node.firstChild
    while (child) {
      frament.appendChild(child)
      child = node.firstChild
    }
    return frament
  }
  /**
   * 解析节点node以及指令
   * @param {*} el
   */
  compileElement(el) {
    var childNodes = el.childNodes
    var self = this
    Array.prototype.slice.call(childNodes).forEach(node => {
      var text = node.textContent
      if (Tool.isElementNode(node)) {
        self.compile(node)
      }
      else if (Tool.isTextNode(node) && /\{\{(.+)\}\}/.test(text)) {
        self.compileText(node, text.match(/\{\{(.+)\}\}/)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  }
  /**
   * 除了{{name}}指令实现其他指令
   * @param {*} node
   */
  compile(node) {
    var nodeAttrs = node.attributes
    var self = this
    Array.prototype.forEach.call(nodeAttrs, attr => {
      var attrName = attr.name
      if (self.isDirective(attrName)) {
        var exp = attr.value
        var dir = attrName.substring(2)
        if (self.isEventDirective(dir)) {
          self.compileEvent(node, self.data, exp, dir)
        } else {
          self.compileModel(node, self.data, exp, dir)
        }
        node.removeAttribute(attrName)
      }
    })
  }
  /**
   * 具体监听dom和数据
   * @param {*} node
   * @param {*} exp
   */
  compileText(node, exp) {
    var self = this
    var initText = this.data[exp]
    this.updateText(node, initText)
    new Subscribe(this.data, exp, function (value) {
      self.updateText(node, value)
    })
  }
  /**
   * 事件指令
   */
  compileEvent(node, data, exp, dir) {
    var eventType = dir.split(':')[1]
    var cb = data.methods && data.methods[exp]
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(data), false)
    }
  }
  /**
   * v-model指令
   */
  compileModel(node, data, exp, dir) {
    var self = this
    var val = this.data[exp]
    this.modelUpdater(node, val)
    new Subscribe(this.data, exp, function (value) {
      self.modelUpdater(node, value)
    })
    node.addEventListener('input', function (e) {
      var newvalue = e.target.value
      if (val === newvalue) {
        return
      }
      self.data[exp] = newvalue
      val = newvalue
    })
  }
  /**
   * 更新表单value值
   * @param {*} node
   * @param {*} value
   */
  modelUpdater(node, value) {
    node.value = typeof value === void 0 ? '' : value
  }
  /**
   * 更新节点内容
   * @param {*} node
   * @param {*} value
   */
  updateText(node, value) {
    node.textContent = typeof value === void 0 ? '' : value
  }
  /**
   * 判断是否是指令
   * @param {*} attr
   */
  isDirective(attr) {
    return attr.indexOf('v-') === 0
  }
  /**
   * 判断是否是事件指令
   */
  isEventDirective(attr) {
    return attr.indexOf('on:') === 0
  }
}
export default Compile
