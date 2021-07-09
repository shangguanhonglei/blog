(function (global) {

  //默认参数
  var defaults = {
    lang: 'zh-CN',
    width: 100,
    height: 100,
    refreshPeriod: 60000,
    interface: 'https://cn-api-weather.vnnox.com/api/weather/integration',
    temperatureUnit: 'CENTIGRADE',
    address: '西安',
    longitude: 108.95,
    latitude: 34.27,
    path:'./',
    module: 1,
    airQuality: true,
    comfort: true,
    windSpeed: true,
    sunrise: true,
    living: true,
    pageDuration: 2,
    basicInfo: true,
    isSyn: false
  }
  // 四种样式基本尺寸
  var BASE_SIZE = {
    1: {
      vbW: 400,
      vbH: 240
    },
    2: {
      vbW: 400,
      vbH: 240
    },
    3: {
      vbW: 400,
      vbH: 140
    },
    4: {
      vbW: 160,
      vbH: 240
    }
  }
  // 四种样式高级尺寸
  var HIGH_SIZE = {
    1: {
      vbW: 400,
      vbH: 480
    },
    2: {
      vbW: 800,
      vbH: 240
    },
    3: {
      vbW: 800,
      vbH: 140
    },
    4: {
      vbW: 160,
      vbH: 480
    }
  }
  //四种样式详细页偏移量
  var HIGH_OFFSET = {
    1: 'translate(0 240)',
    2: 'translate(400 0)',
    3: 'translate(400 0)',
    4: 'translate(0 240)'
  }
  //四种天气背景颜色
  var BACKGROUND_COLOR = {
    'cloudnight': 'rgb(80,85,105)',
    'cloud': 'rgb(151,161,177)',
    'sunshine': 'rgb(66,163,249)',
    'sunshinenight': 'rgb(53,56,85)'
  }
  var CACHE_TEMPLATE = 'TEMPLATE'
  var CACHE_IMAGE = Object.create(null)
  //日升日落效果
  var RADIUS = 118
  var FLAT_ANGLE = 180
  //对于除样式四外的其余四种样式都不是半圆，需要对其算法进行校正
  var MIN_ANGLE = 6
  var MAX_ANGLE = 173
  var Doc = document.documentElement
  /**
   * 构造函数
   * @param {*} element
   * @param {*} options
   */
  function AdvancedWeather($element, options) {
    var self = this
    this.PLAY_ORDER = []
    this.$element = $element
    var $canvas = this.$canvas = document.createElement('div')
    $element.appendChild($canvas)
    this.setOptions(options)
    //path设置之后再调用css
    use(this.options.path + 'index.css', {
      complete: function (err) {
        if (err && err.length) {
          console.log(err)
        }
      }
    })
    loadScript(this.options.path + 'template.js?v='+ new Date().getTime(),CACHE_TEMPLATE,function(id){
      setTimeout(function(){
        global[id] = true
        self.start()
        self.scale()
      },0)
    })

  }
  AdvancedWeather.clearCache = function (key) {
    Cache(key || void 0, null)
  }
  var WP = AdvancedWeather.prototype
  /**
   * 处理参数
   * @param {*} options
   */
  WP.setOptions = function (options) {
    for (var key in defaults) {
      if (options[key] === void 0) {
        options[key] = defaults[key]
      }
    }
    switch (options.lang) {
      case 'zh-cn':
        options.lang = 'zh-CN'
        break
      case 'en_us':
        options.lang = 'en'
        break
      case 'jp':
        options.lang = 'ja'
        break
    }

    this.options = options
  }
  /**
   * 根据数据具体的渲染界面
   */
  WP.draw = function () {
    var $canvas = this.$canvas
    var options = this.options
    $canvas.style.cssText = '\
    display: flex;\
    justify-content: center;\
    align-items: center;\
    width: 100%;\
    height: 100%;\
    background: rgba(0,0,0,0)\
    '
    var history = Cache(options.longitude + ',' + options.latitude + '_' + options.lang)
    var params
    if (options.useHistory && history && !options.reload) {
      params = this.convert(history)
      this.render(params)
    } else {
      this.getWeather(function (data) {
        params = this.convert(data)
        this.render(params)
      })
    }

  }
  /**
   * 根据天气样式类型渲染
   */
  WP.render = function (params) {
    var self = this
    this.params = params
    var options = this.options
    this.move = ''
    var content = ''
    var Tpl = global.AdvancedWeatherTemplate
    var MainDetail = Tpl.MainDetail
    var HorMainDetail = Tpl.HorMainDetail
    var VerMainDetail = Tpl.VerMainDetail
    var playOrder = getPlayerOrder.call(this,params)
    var isShowDetail = playOrder.length > 0
    this.rect = objectClone(BASE_SIZE[+options.module])
    if(isShowDetail && options.basicInfo){
      this.rect = objectClone(HIGH_SIZE[+options.module])
      this.move = HIGH_OFFSET[+options.module]
    }
    this.details = []
    //获取背景图片
    this.setBackground(params,function(){
      switch(+options.module){
        case 1:
          //主样式竖版
          if(options.basicInfo){
            content = Tpl.mainTemplate.call(self,params)
          }
          if(isShowDetail){
            self.details = getDetails.call(self,MainDetail,params)
          }
          break
        case 2:
          //主样式横版
          if(options.basicInfo){
            content = Tpl.mainTemplate.call(self,params)
          }
          if(isShowDetail){
            self.details = getDetails.call(self,MainDetail,params)
          }
          break
        case 3:
          //水平
          if(options.basicInfo){
            content = Tpl.horMainTemplate.call(self,params)
          }
          if(isShowDetail){
            self.details = getDetails.call(self,HorMainDetail,params)
          }
          break
        case 4:
          //垂直
          if(options.basicInfo){
            content = Tpl.verMainTemplate.call(self,params)
          }
          if(isShowDetail){
            self.details = getDetails.call(self,VerMainDetail,params)
          }
          break
      }
      self.$canvas.style.background = ''
      //在渲染之前先清除定时器
      self.interval && clearInterval(self.interval)
      if(self.details.length){
        self.$canvas.innerHTML = self.renderDetail(content,self.details[0])
        self.bindEvent()
        if(self.details.length-1){
          var i = 1
          self.interval = setInterval(function(){
            if(i >= self.details.length){
              i = 0
            }
            self.$canvas.innerHTML = self.renderDetail(content,self.details[i])
            self.bindEvent()
            i ++
          },(options.pageDuration || 10)*1000)
        }
      }else{
        self.$canvas.innerHTML = self.renderDetail(content)
        self.bindEvent()
      }
    })
  }
  /**
   * 将所有的svg片段组合起来渲染canvas，主要为了兼容同步V1.8.7
   */
  WP.renderDetail = function(content,details){
    var innerContent = content || ''
    var innerDetails = details || ''
    return '<svg class="js-weather__body" xmlns="http://www.w3.org/2000/svg">' + innerContent + innerDetails + '</svg>'
  }
  /**
   * 渲染完成之后操作
   */
  WP.bindEvent = function(){
    var options = this.options
    var params = this.params
    //渲染天气组件的外壳
    var isBody = this.$element === document.body
    var scale = options.width /options.height >= this.rect.vbW /this.rect.vbH
    var scaleH = isBody && options.isSyn ? (scale ? options.height : parseInt(options.width * this.rect.vbH/this.rect.vbW))+'px': '100%'
    var scaleW = isBody && options.isSyn ? (scale ? parseInt(options.height * this.rect.vbW /this.rect.vbH) : options.width)+'px': '100%'
    var $template = this.$canvas.querySelector('.js-weather__body')
    $template.setAttribute('style','width: ' + scaleW + '; height: ' + scaleH + ';')
    $template.setAttribute('viewBox','0 0 '+this.rect.vbW+' '+this.rect.vbH+'')
    //处理各个子页面里面的动效
    var $detail = this.$canvas.querySelector('.js-content__detail')
    if($detail){
      $detail.setAttribute('transform',this.move)
    }
    var $airquality = this.$canvas.querySelector('.js-detail__airquality')
    if($airquality){
      var $aqi = $airquality.querySelector('.js-air-process')
      var aqi = params.aqi || 0
      setProcess($aqi,aqi,500)
    }
    var $comform = this.$canvas.querySelector('.js-detail__comform')
    if($comform){
      var $humidity = $comform.querySelector('.js-air-process')
      var humidity = params.humidity || 0
      setProcess($humidity,humidity,100)
    }
    var $sunrise = this.$canvas.querySelector('.js-content__sunrise')
    var sunset = params.sunset *1000
    var sunrise = params.sunrise * 1000
    var now = new Date().getTime()
    if($sunrise){
      var total = sunset - sunrise
      var rotate = 0
      //如果是白天
      if(now > sunrise && now < sunset){
        var speed = now - sunrise
        rotate = Math.round((speed / total) * FLAT_ANGLE)
      }
      //如果是日升之前
      else if(now <= sunrise){
        rotate = 0
      }
      //如果是日落之后
      else if(now >= sunset){
        rotate = FLAT_ANGLE
      }
      var progress = RADIUS
      if(rotate> 90){
        progress = RADIUS + RADIUS * Math.cos((FLAT_ANGLE-rotate)/FLAT_ANGLE * Math.PI)
      }else{
        progress = RADIUS - RADIUS * Math.cos(rotate/FLAT_ANGLE * Math.PI)
      }
      //对于非样式4的天气图不规则，所以进行校正
      if(+options.module !== 4){
        if(rotate <= MIN_ANGLE){
          rotate = MIN_ANGLE
        }
        if(rotate >= MAX_ANGLE){
          rotate = MAX_ANGLE
        }
      }
      var $sun = $sunrise.querySelector('.js-sunrise__sun')
      var $rate = $sunrise.querySelector('.js-sunrise__rate')
      $sun.setAttribute('transform','rotate('+rotate+',161,118)')
      $rate.setAttribute('width',progress)
    }
  }
  /**
   * 设置圆环的进度
   * @param {*} $process
   * @param {*} percent
   */
  function setProcess($process,percent,max){
    max = max || 100
    percent = percent || 0
    var r = $process.getAttribute('r')
    var c = Math.PI * r * 2 * 5/6
    var pct = ((max-percent)/max)*c
    var start = Math.PI * r * 2 * 1/6
    $process.setAttribute('stroke-dashoffset',pct+start)
  }
  /**
   * 获取详细页面播放顺序
   * @param {*} params
   */
  function getPlayerOrder(params){
    var options = this.options
    var playOrder = []
    if(options.airQuality && params.aqiDetail && Object.keys(params.aqiDetail).length){
      playOrder.push('airQuality')
    }
    if(options.comfort){
      playOrder.push('comfort')
    }
    if(options.windSpeed){
      playOrder.push('windSpeed')
    }
    if(options.sunrise){
      playOrder.push('sunrise')
    }
    if(options.living && params.lifestyle && Object.keys(params.lifestyle).length){
      playOrder.push('living')
    }
    return playOrder
  }
  /**
   * 根据是否启用选项加载数据
   * @param {*} main
   * @param {*} params
   */
  function getDetails(main,params){
    var self = this
    var options = this.options
    var Details = []
    var playOrder = getPlayerOrder.call(this,params)
    if(this.PLAY_ORDER.length && options.origin === 'editor'){
      var item = playOrder.findIndex(function(element){
        return !self.PLAY_ORDER.includes(element)
      })
      if(item >= 0){
        var firstPlayOrder = playOrder.slice(item)
        var lastPlayOrder = playOrder.slice(0,item)
        playOrder = [].concat(firstPlayOrder,lastPlayOrder)
      }
    }
    this.PLAY_ORDER = [].concat(playOrder)
    playOrder.forEach(function(element){
      Details.push(main[element].call(self,params))
    })
    return Details
  }

  /**
   * 根据接口获取数据
   */
  WP.getWeather = function (callback) {
    var self = this
    var options = this.options
    var pos = options.longitude + ',' + options.latitude
    getDataByJsonp({
      url: options.interface,
      data: {
        city: pos,
        lang: options.lang
      },
      success: function (json) {
        if (json.message === 'ok' || +json.code === 21000001) {
          var info = json.weather
          Cache(pos + '_' + options.lang, info)
          callback && callback.call(self, info)
        }
      },
      error: function(){
        self.$canvas.style.background = 'url('+options.path+'images/sunshine.png)'
      }
    })
  }
  /**
   * 数据转换
   */
  WP.convert = function (data) {
    var options = this.options
    var contents = JSON.parse(JSON.stringify(data))
    contents.humidity = data.humidity
    contents.currentTemp = '℃'
    contents.peakTemp = data.tempMin + '/' + data.tempMax
    //温度单位转换
    if (options.temperatureUnit !== 'CENTIGRADE') {
      var tempMin = parseInt(data.tempMin * 1.8 + 32)
      var tempMax = parseInt(data.tempMax * 1.8 + 32)
      contents.temp = parseInt(data.temp * 1.8 + 32)
      contents.fl = parseInt(data.fl * 1.8 + 32)
      contents.currentTemp = '℉'
      contents.peakTemp = tempMin + '/' + tempMax
    }
    var timezone = data.timezone || 8
    var offset_GMT = new Date().getTimezoneOffset()
    var sunrise = new Date(data.sunrise*1000 + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
    contents.sunriseFormat = zero(sunrise.getHours())+':'+zero(sunrise.getMinutes())
    var sunset = new Date(data.sunset*1000 + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
    contents.sunsetFormat = zero(sunset.getHours())+':'+zero(sunset.getMinutes())
    contents.lifestyle = Object.create(null)
    //生活指数
    if(Array.isArray(data.lifestyle) && data.lifestyle){
      data.lifestyle.forEach(function(element){
        contents.lifestyle[element.type] = element.brf
      })
    }
    return contents
  }
  function zero(num){
    if(+num < 10){
      return '0'+num
    }
    return num
  }
  /**
   * 设置天气背景图
   * @param {*} data
   */
  WP.setBackground = function (data,cb) {
    var options = this.options
    var CONFIG = global.AdvancedWeatherConfig
    var type = CONFIG.CODE[data.code].type
    var now = new Date()
    var currentHour = now.getTime()
    var day = 'night'
    var minTime = data.sunrise * 1000
    var maxTime = data.sunset * 1000
    if (currentHour > minTime && currentHour < maxTime) {
      day = 'sun'
    }
    if (day === 'sun' && type === 'sunshine') {
      //白天，晴天
      data.background = 'sunshine'
    } else if (day === 'sun' && type === 'cloudy') {
      //白天，多云
      data.background = 'cloud'
    } else if (day === 'night' && type === 'sunshine') {
      //晚上，晴天
      data.background = 'sunshinenight'
    } else {
      //晚上，多云
      data.background = 'cloudnight'
    }
    data.bkgColor = BACKGROUND_COLOR[data.background]
    var background = data.background
    if(+options.module === 3){
      background = data.background + '2'
    }else if(+options.module === 4){
      background = data.background + '1'
    }
    var rect = objectClone(BASE_SIZE[+options.module])
    // 图片缓存
    cacheImage(options.path+'images/' + background + '.png',rect.vbW,rect.vbH,function(image){
      data.backgroundUrl = image
      cb && cb()
    })
  }
  /**
   * 缓存图片
   */
  function cacheImage(image,width,height,cb){
    if(CACHE_IMAGE[image]){
      cb && cb(CACHE_IMAGE[image])
    }else{
      var img = new Image()
      img.src = image
      img.onload = function(){
        try {
          var canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          var ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0,width,height)
          CACHE_IMAGE[image] = canvas.toDataURL()
          cb && cb(CACHE_IMAGE[image])
        }catch(e){
          CACHE_IMAGE[image] = image
          cb && cb(CACHE_IMAGE[image])
        }

      }
    }
  }
  /**
   * 开启循环请求
   */
  WP.start = function () {
    var self = this
    this.draw()
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(function () {
      self.draw()
    }, +self.options.refreshPeriod)
  }
  /**
   * 视图缩放
   */
  WP.scale = function () {
    var $element = this.$element
    var options = this.options
    var $canvas = this.$canvas
    var isBody = $element === document.body
    var CW = isBody ? Doc.clientWidth : $element.offsetWidth
    var CH = isBody ? Doc.clientHeight : $element.offsetHeight
    if (isBody && options.isSyn) {
      var width = options.width
      var height = options.height
      var wScale = CW / width
      var hScale = CH / height
      var scale = wScale > hScale ? hScale : wScale
      $canvas.style.cssText += '\
      -webkit-transform:scale('+ wScale + ',' + hScale + ');\
      transform:scale('+ wScale + ',' + hScale + ');\
      '
    }
  }
  /**
   * 销毁组件
   */
  WP.destroy = function () {
    this.timer && clearInterval(this.timer)
    this.$canvas && this.$canvas.parentNode.removeChild(this.$canvas)
    this.interval && clearInterval(this.interval)
  }
  var CACHE_KEY = '__nova_advanced_weather__'
  /**
   * 设置/获取天气缓存
   * @param {*} key
   * @param {*} value
   */
  function Cache(key, value) {
    if (value === null) {
      window.sessionStorage.removeItem(CACHE_KEY)
      return
    }
    var caches = window.sessionStorage.getItem(CACHE_KEY)
    if (caches) {
      caches = JSON.parse(caches)
    } else {
      caches = Object.create(null)
    }
    if (value) {
      caches[key] = value
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(caches))
    } else {
      return caches[key] || void 0
    }
  }
  /**
   * 根据jsonp接口获取天气数据
   * @param {*} params
   */
  function getDataByJsonp(params) {
    var time = Date.now()
    // 序列化参数
    var data = []
    var callbackName = 'callback' + time
    params.data.callback = callbackName
    for (var k in params.data) {
      data.push(encodeURIComponent(k) + '=' + encodeURIComponent(params.data[k]))
    }
    data.push('v=' + time)
    params.data = data.join('&')
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    head.appendChild(script)
    var isError = true
    window[callbackName] = function (json) {
      isError = false
      params.success && params.success(json)
      script && script.parentNode.removeChild(script)
      setTimeout(function () {
        window[callbackName] = null
      }, 0)
    }
    setTimeout(function(){
      if(isError){
        params.error && params.error()
      }
    },5000)

    script.src = params.url + '?' + params.data
  }
  /**
   * 加载css
   * @param {*} paths
   * @param {*} options
   */
  function use(paths, options) {
    if (typeof paths === 'string') {
      paths = [paths]
    }
    if (!Array.isArray(paths) || !paths.length) {
      return
    }
    var errors = [], success = []
    for (var i = 0, len = paths.length; i < len; i++) {
      (function (j) {
        loadCss(paths[j], function (code, path) {
          if (code === 1) {
            success.push(path)
          } else {
            errors.push(path)
          }
          if (success.length + errors.length === len) {
            options.complete && options.complete(errors, success)
          }
        })
      })(i)
    }
  }
  /**
   * 对象克隆
   * @param {*} object
   */
  function objectClone(object){
    return JSON.parse(JSON.stringify(object))
  }
  var $HEAD_ELEMENT = document.head
  /**
   * 页面中添加css文件
   * @param {*} path
   * @param {*} cb
   */
  function loadCss(path, cb) {
    var name = path.replace(/\.|\//g, '')
    var id = 'nova_use_' + name
    if (document.getElementById(id)) {
      cb && cb(1, path)
      return
    }
    var $link = document.createElement('link')
    $link.rel = 'stylesheet'
    $link.id = id
    $link.type = 'text/css'
    //增加个标识，方便在不用的时候释放
    $link.setAttribute('data-load-type', 'nova_use')

    var isLoaded = false
    $link.onload = function () {
      if (!isLoaded) {
        isLoaded = true
        cb && cb(1, path)
      }
    }
    $link.onerror = function () {
      if (!isLoaded) {
        isLoaded = true
        cb && cb(0, path)
      }
    }
    //IE和Safari貌似不支持link的onload的和error事件，暂时用以下方式返回
    setTimeout(function () {
      if (!isLoaded) {
        isLoaded = true
        cb && cb(1, path)
      }
    }, 1000)

    path += path.indexOf('?') > -1 ? '&t=' : '?t='
    path += new Date() * 1

    $link.href = path
    $HEAD_ELEMENT.appendChild($link)
  }
  /**
   * 引入外部js文件
   * @param {*} url
   * @param {*} cb
   */
  function loadScript(url,id,cb) {
    if(global[id]){
      cb && cb(id)
    }else{
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'UTF-8'

      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            script.onreadystatechange = null
            cb && cb(id)
          }
        }
      } else {
        script.onload = function(){
          cb && cb(id)
        }
      }
      script.src = url
      $HEAD_ELEMENT.appendChild(script)
    }

  }
  global.AdvancedWeather = AdvancedWeather
})(window)
