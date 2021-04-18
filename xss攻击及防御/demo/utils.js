(function(){
  console.log(1)
var Tool = Object.create(null)
var _MEMORY_CACHES_ = Object.create(null)
  Tool.set = function (name, value, session) {
    var Storage = session ? window.sessionStorage : window.localStorage
    if (value === null) {
      delete _MEMORY_CACHES_[name]
      Storage.removeItem(name)
    } else {
      value = JSON.stringify(value)
      _MEMORY_CACHES_[name] = value
      Storage.setItem(name, value)
    }
  }
  Tool.parse = function (url) {
    url = url && typeof url === 'string' ? url : window.location.href
    url = url.split('?')
    var result = Object.create(null)
    if (!url[1]) return result
    url = url[1].split('&')
    var param

    for (var i = 0, len = url.length; i < len; i++) {
      if (url[i]) {
        param = url[i].split('=')
        result[param[0]] = decodeURIComponent(param[1] || '')
      }
    }

    return result
  }
  Tool.get = function (name, session) {
    var value = _MEMORY_CACHES_[name]
    var Storage = session ? window.sessionStorage : window.localStorage
    if (!value) {
      value = Storage.getItem(name)
    }
    try {
      value = JSON.parse(value)
    } catch (e) {
      //
    }
    return value
  }
  window.Tool = Tool
})()