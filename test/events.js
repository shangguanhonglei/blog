/*
 * @Description: 
 * @Author: tianleilei1
 * @Date: 2021-07-02 16:18:01
 * @LastEditTime: 2021-07-02 16:30:55
 * @LastEditors: tianleilei1
 */
(function(){
  function Events(){
    this._events = Object.create(null)
  }
  var EP = Events.prototype
  EP.on = function(name,handle,context){
    if (!name || !isFunction(handle)) {
      return this
    }
    const _events = this._events[name] || (this._events[name] = [])
    const event = Object.create(null)
    event.id = _events.length
    event.handle = handle
    event.context = context
    _events.push(event)
    return this
  }
  EP.off = function(name, handle, context){
    if (!name || !this._events[name]) {
      return this
    }
    // 如果指定了handle
    if (handle && isFunction(handle)) {
      let _events = this._events[name]
      _events.forEach(event => {
        // 匹配相同引用的handle
        if (
          event &&
          (handle === (event.handle || event.handle._handle)) &&
          (!context || event.context === context)
        ) {
          // 删除索引为event.id的事件  
          delete _events[event.id]
        }
      })
      // 如果当前队列已空，则移除该名称事件
      if (!_events.length) {
        delete this._events[name]
      }
    }
    // 解绑所有同名事件
    else if (handle === null) {
      delete this._events[name]
    }
    return this
  }
  EP.one = function(name, handle, context) {
    if (!name || !isFunction(handle)) {
      return this
    }
    const self = this
    const once = function () {
      self.off(name, once, context)
      return handle.apply(context || self, arguments)
    }
    once._handle = handle
    this.on(name, once, context)
    return this
  }
  EP.emit = function(name, ...args){
    if (!name || !this._events[name]) {
      return this
    }
    let len = this._events[name].length
    let i = -1
    // 依次执行事件队列
    while (++i < len) {
      let event = this._events[name][i]
      event.handle.apply(event.context || this, args)
    }
    return this
  }
  EP.destroy = function() {
    this._events = null
  }
  window.Events = Events
})()