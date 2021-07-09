(function (global) {

  var defaults = {
    width: 200,
    height: 200,
    lang: 'zh-CN',
    zone: 'GMT',
    zoneType: 'player'
  }
  //多语言
  var LOCALE = {
    'zh-CN': {
      am: '上午',
      pm: '下午'
    },
    'en': {
      am: 'AM',
      pm: 'PM'
    },
    'ja': {
      am: 'AM',
      pm: 'PM'
    }
  }
  var Doc = document.documentElement
  /**
   * 模拟时钟
   * @param {*} container
   * @param {*} options
   */
  function Clock($container, options) {
    var $canvas = this.$canvas = document.createElement('div')
    this.$container = $container
    $container.appendChild($canvas)
    this.setOptions(options)
    this.start()
    this.scale()
  }
  var CP = Clock.prototype
  /**
   * 设置参数
   */
  CP.setOptions = function (options) {
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

    for (var key in defaults) {
      if (options[key] === void 0) {
        options[key] = defaults[key]
      }
    }

    this.options = options
    // this.options = Object.assign({}, defaults, options)

  }
  /**
 * 视图缩放
 */
  CP.scale = function () {
    var $container = this.$container
    var options = this.options
    var $canvas = this.$canvas
    var isBody = $container === document.body
    var CW = isBody ? Doc.clientWidth : $container.offsetWidth
    var CH = isBody ? Doc.clientHeight : $container.offsetHeight
    //var size = options.width <= options.height ? options.width : options.height
    if (isBody) {
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
   * 开始绘制
   */
  CP.start = function () {
    var self = this
    this.draw()
    this.update()
    this.interval && clearInterval(this.interval)
    this.interval = setInterval(function () {
      self.update()
    }, 1000)
  }
  CP.destroy = function () {
    this.$canvas.parentNode.removeChild(this.$canvas)
    this.interval && clearInterval(this.interval)
  }
  /**
   * 绘制
   */
  CP.draw = function () {
    var $canvas = this.$canvas
    var options = this.options
    var $container = this.$container
    $canvas.style.cssText = '\
    display: flex;\
    justify-content: center;\
    align-items: center;\
    width: 100%;\
    height: 100%;\
    background: rgba(0,0,0,0)\
    '
    var isBody = $container === document.body
    var size = isBody ? (options.width <= options.height ? options.width : options.height) + 'px' : '100%'
    var template =
      '<svg class ="content" style="width: ' + size + '; height: ' + size + ';" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392 392">' +
      '<defs>\
      <style>.cls-1{fill:#c8c8c8;}.cls-2{fill:#fcfcfc;}.cls-3{fill:#d92626;}.cls-4{font-size:43.14px;}.cls-4,.cls-5{font-family:AdobeSongStd-Light-GBpc-EUC-H, Adobe Song Std;}.cls-5{font-size:43.14px;}.cls-6{font-size:42.34px;font-family:Arial, Source Han Serif CN;letter-spacing:0.04em;}.zone{fill:#2C26C7;}.cls-7{fill:#222;}\
      </style>\
    </defs>'+
      '<g  data-name="边框">\
      <circle class="cls-7" cx="196" cy="196" r="196"/>\
      <circle class="cls-1" cx="196" cy="196" r="166"/>\
      <circle class="cls-2" cx="196" cy="196" r="162"/>\
    </g>'+
      '<text  class="cls-6 zone"  transform="translate(160 155)">上午</text>' +
      '<g  data-name="指针">\
      <polygon class="hourhand" points="196 91.72 192.17 100.33 192.17 233.67 199.83 233.67 199.83 100.33 196 91.72"/>\
      <circle cx="196" cy="196" r="12.17"/>\
      <polygon class="minutehand" points="196 47.69 193.75 51.15 193.75 238.7 198.25 238.7 198.25 51.15 196 47.69"/>\
      <circle cx="196" cy="196" r="17.5"/>\
      <g class="secondhand">\
        <rect class="cls-3" x="193.22" y="221.06" width="5.4" height="28.83"/>\
        <polygon  class="cls-3" points="195.92 52.96 194.92 54.56 194.86 221.06 196.86 221.06 196.92 54.56 195.92 52.96"/>\
      </g>\
      <circle class="cls-3" cx="195.91" cy="196" r="8.85"/>\
    </g>'+
      '<g  data-name="数字">\
      <text class="cls-4" transform="translate(175.95 86.29)">12</text>\
      <text class="cls-4" transform="translate(247.35 102.77)">1</text>\
      <text class="cls-4" transform="translate(290.9 147.96)">2</text>\
      <text class="cls-5" transform="translate(310.47 209.38)">3</text>\
      <text class="cls-5" transform="translate(290.9 271.6)">4</text>\
      <text class="cls-5" transform="translate(185.91 332.72)">6</text>\
      <text class="cls-5" transform="translate(126.82 316.06)">7</text>\
      <text class="cls-5" transform="translate(83.07 271.6)">8</text>\
      <text class="cls-5" transform="translate(73.11 147.96)">10</text>\
      <text class="cls-5" transform="translate(247.35 316.06)">5</text>\
      <text class="cls-5" transform="translate(61.6 209.38)">9</text>\
      <text class="cls-5" transform="translate(116.86 102.77)">11</text>\
    </g>'+
      '<g id="dot" data-name="刻度">\
      <rect x="193.88" y="39.96" width="4.25" height="9.75"/>\
      <rect x="269.46" y="60.21" width="4.25" height="9.75" transform="translate(68.94 -127.08) rotate(30)"/>\
      <rect x="324.8" y="115.55" width="4.25" height="9.75" transform="translate(267.79 -222.91) rotate(60.01)"/>\
      <rect x="345.04" y="191.15" width="4.25" height="9.75" transform="matrix(0, 1, -1, 0, 543.24, -151.12)"/>\
      <rect x="324.78" y="266.73" width="4.25" height="9.75" transform="translate(725.6 124.38) rotate(120.01)"/>\
      <rect x="269.43" y="322.06" width="4.25" height="9.75" transform="translate(670.16 474.38) rotate(150.01)"/>\
      <rect x="193.83" y="342.29" width="4.25" height="9.75" transform="translate(391.82 694.39) rotate(-179.98)"/>\
      <rect x="118.25" y="322.01" width="4.25" height="9.75" transform="translate(61.07 670.15) rotate(-149.98)"/>\
      <rect x="62.93" y="266.66" width="4.25" height="9.75" transform="translate(-137.64 463.57) rotate(-119.98)"/>\
      <rect x="42.71" y="191.06" width="4.25" height="9.75" transform="translate(-151.12 240.69) rotate(-89.98)"/>\
      <rect x="63" y="115.48" width="4.25" height="9.75" transform="translate(-71.67 116.51) rotate(-59.97)"/>\
      <rect x="118.36" y="60.17" width="4.25" height="9.75" transform="translate(-16.38 68.89) rotate(-29.97)"/>\
      <rect x="195.44" y="39.96" width="1.13" height="7.81"/>\
      <rect x="211.34" y="40.79" width="1.13" height="7.81" transform="translate(5.83 -21.91) rotate(6)"/>\
      <rect x="227.07" y="43.28" width="1.12" height="7.81" transform="translate(14.79 -46.3) rotate(12)"/>\
      <rect x="242.46" y="47.41" width="1.12" height="7.81" transform="translate(27.76 -72.59) rotate(18)"/>\
      <rect x="257.32" y="53.11" width="1.12" height="7.81" transform="translate(45.5 -99.97) rotate(24)"/>\
      <rect x="271.51" y="60.35" width="1.13" height="7.81" transform="translate(68.59 -127.44) rotate(30)"/>\
      <rect x="284.87" y="69.02" width="1.12" height="7.81" transform="translate(97.4 -153.86) rotate(36)"/>\
      <rect x="297.25" y="79.04" width="1.12" height="7.81" transform="translate(132.02 -177.98) rotate(42.01)"/>\
      <rect x="308.51" y="90.31" width="1.12" height="7.81" transform="translate(172.31 -198.52) rotate(48.01)"/>\
      <rect x="318.53" y="102.68" width="1.12" height="7.81" transform="translate(217.8 -214.22) rotate(54.01)"/>\
      <rect x="327.2" y="116.04" width="1.12" height="7.81" transform="translate(267.8 -223.88) rotate(60.01)"/>\
      <rect x="334.43" y="130.23" width="1.12" height="7.81" transform="translate(321.33 -226.45) rotate(66.01)"/>\
      <rect x="340.13" y="145.1" width="1.12" height="7.81" transform="translate(377.19 -221.05) rotate(72.01)"/>\
      <rect x="344.25" y="160.49" width="1.12" height="7.81" transform="translate(433.99 -207.05) rotate(78.01)"/>\
      <rect x="346.74" y="176.22" width="1.12" height="7.81" transform="translate(490.2 -184.08) rotate(84.01)"/>\
      <rect x="347.57" y="192.12" width="1.12" height="7.81" transform="translate(544.23 -152.07) rotate(90.01)"/>\
      <rect x="346.74" y="208.03" width="1.12" height="7.81" transform="translate(594.44 -111.26) rotate(96.01)"/>\
      <rect x="344.24" y="223.76" width="1.12" height="7.81" transform="translate(639.24 -62.21) rotate(102.01)"/>\
      <rect x="340.12" y="239.14" width="1.12" height="7.81" transform="translate(677.16 -5.78) rotate(108.01)"/>\
      <rect x="334.41" y="254.01" width="1.13" height="7.81" transform="translate(706.88 56.9) rotate(114.01)"/>\
      <rect x="327.17" y="268.19" width="1.13" height="7.81" transform="translate(727.29 124.43) rotate(120.01)"/>\
      <rect x="318.49" y="281.55" width="1.13" height="7.81" transform="translate(737.56 195.23) rotate(126.02)"/>\
      <rect x="308.47" y="293.92" width="1.13" height="7.81" transform="translate(737.15 267.58) rotate(132.02)"/>\
      <rect x="297.2" y="305.18" width="1.13" height="7.81" transform="translate(725.86 339.67) rotate(138.02)"/>\
      <rect x="284.82" y="315.2" width="1.13" height="7.81" transform="translate(703.81 409.65) rotate(144.02)"/>\
      <rect x="271.46" y="323.87" width="1.13" height="7.81" transform="translate(671.45 475.75) rotate(150.02)"/>\
      <rect x="257.27" y="331.1" width="1.13" height="7.81" transform="translate(629.57 536.3) rotate(156.02)"/>\
      <rect x="242.4" y="336.8" width="1.13" height="7.81" transform="translate(579.23 589.77) rotate(162.02)"/>\
      <rect x="227.02" y="340.92" width="1.13" height="7.81" transform="translate(521.77 634.9) rotate(168.02)"/>\
      <rect x="211.28" y="343.4" width="1.13" height="7.81" transform="translate(458.72 670.66) rotate(174.02)"/>\
      <rect x="195.38" y="344.23" width="1.13" height="7.81" transform="translate(391.75 696.35) rotate(-179.98)"/>\
      <rect x="179.48" y="343.39" width="1.13" height="7.81" transform="translate(322.64 711.56) rotate(-173.98)"/>\
      <rect x="163.75" y="340.89" width="1.13" height="7.81" transform="translate(253.19 716.26) rotate(-167.98)"/>\
      <rect x="148.36" y="336.76" width="1.13" height="7.81" transform="translate(185.14 710.7) rotate(-161.98)"/>\
      <rect x="133.5" y="331.05" width="1.13" height="7.81" transform="matrix(-0.91, -0.41, 0.41, -0.91, 120.14, 695.47)"/>\
      <rect x="119.31" y="323.81" width="1.13" height="7.81" transform="translate(59.67 671.44) rotate(-149.97)"/>\
      <rect x="105.96" y="315.13" width="1.13" height="7.81" transform="translate(5.02 639.71) rotate(-143.97)"/>\
      <rect x="93.59" y="305.1" width="1.13" height="7.81" transform="translate(-42.79 601.58) rotate(-137.97)"/>\
      <rect x="82.33" y="293.84" width="1.13" height="7.81" transform="translate(-83.04 558.49) rotate(-131.97)"/>\
      <rect x="72.31" y="281.46" width="1.13" height="7.81" transform="translate(-115.26 511.96) rotate(-125.97)"/>\
      <rect x="63.65" y="268.09" width="1.13" height="7.81" transform="translate(-139.34 463.5) rotate(-119.97)"/>\
      <rect x="56.42" y="253.9" width="1.13" height="7.81" transform="translate(-155.44 414.61) rotate(-113.97)"/>\
      <rect x="50.72" y="239.03" width="1.13" height="7.81" transform="translate(-163.98 366.67) rotate(-107.97)"/>\
      <rect x="46.61" y="223.64" width="1.13" height="7.81" transform="translate(-165.65 320.88) rotate(-101.97)"/>\
      <rect x="44.13" y="207.91" width="1.13" height="7.81" transform="translate(-161.33 278.29) rotate(-95.97)"/>\
      <rect x="43.3" y="192.01" width="1.13" height="7.81" transform="translate(-152.07 239.67) rotate(-89.97)"/>\
      <rect x="44.14" y="176.1" width="1.13" height="7.81" transform="translate(-139 205.55) rotate(-83.97)"/>\
      <rect x="46.65" y="160.37" width="1.13" height="7.81" transform="translate(-123.3 176.2) rotate(-77.97)"/>\
      <rect x="50.78" y="144.99" width="1.13" height="7.81" transform="translate(-106.14 151.62) rotate(-71.97)"/>\
      <rect x="56.49" y="130.13" width="1.13" height="7.81" transform="translate(-88.6 131.55) rotate(-65.96)"/>\
      <rect x="63.73" y="115.94" width="1.13" height="7.81" transform="matrix(0.5, -0.87, 0.87, 0.5, -71.64, 115.52)"/>\
      <rect x="72.42" y="102.59" width="1.13" height="7.81" transform="translate(-56.07 102.86) rotate(-53.96)"/>\
      <rect x="82.45" y="90.22" width="1.13" height="7.81" transform="translate(-42.48 92.75) rotate(-47.96)"/>\
      <rect x="93.72" y="78.97" width="1.13" height="7.81" transform="matrix(0.74, -0.67, 0.67, 0.74, -31.24, 84.29)"/>\
      <rect x="106.1" y="68.95" width="1.13" height="7.81" transform="translate(-22.46 76.52) rotate(-35.96)"/>\
      <rect x="119.46" y="60.29" width="1.13" height="7.81" transform="translate(-16.02 68.52) rotate(-29.96)"/>\
      <rect x="133.66" y="53.07" width="1.13" height="7.81" transform="translate(-11.57 59.41) rotate(-23.96)"/>\
      <rect x="148.53" y="47.37" width="1.13" height="7.81" transform="matrix(0.95, -0.31, 0.31, 0.95, -8.55, 48.47)"/>\
      <rect x="163.92" y="43.26" width="1.13" height="7.81" transform="translate(-6.2 35.1) rotate(-11.96)"/>\
      <rect x="179.65" y="40.78" width="1.13" height="7.81" transform="translate(-3.66 18.94) rotate(-5.96)"/>\
    </g>'+
      '</svg>'
    $canvas.innerHTML = template
    this.getDom()
  }
  CP.getDom = function () {
    var dom = this.dom = Object.create(null)
    var $canvas = this.$canvas
    dom.$minhand = $canvas.querySelector('.minutehand')
    dom.$hourhand = $canvas.querySelector('.hourhand')
    dom.$secondhand = $canvas.querySelector('.secondhand')
    dom.$zone = $canvas.querySelector('.zone')
    dom.$content = $canvas.querySelector('.content')

  }
  CP.update = function () {
    var dom = this.dom
    var options = this.options
    var locale = LOCALE[options.lang]
    var now = new Date()
    var second = now.getSeconds()
    var min = now.getMinutes()
    var hour = (now.getHours() % 12) + min / 60
    var hourDay = now.getHours() + min / 60
    hourDay = hourDay === 0 ? 24 : hourDay

    var secondangle = second * 6 //6 degrees for every minute
    var minangle = min * 6        //6 degrees for every minute
    var hourangle = hour * 30    //30 degrees for every hour
    var $minhand = dom.$minhand
    var $hourhand = dom.$hourhand
    var $secondhand = dom.$secondhand
    var $zone = dom.$zone
    $minhand.setAttribute('transform', 'rotate(' + minangle + ', 196, 196)')
    $hourhand.setAttribute('transform', 'rotate(' + hourangle + ', 196, 196)')
    $secondhand.setAttribute('transform', 'rotate(' + secondangle + ', 196, 196)')
    if (hourDay >= 0 && hourDay < 12) {
      $zone.innerHTML = locale.am
    } else {
      $zone.innerHTML = locale.pm
    }
  }
  global.Clock = Clock
})(window)
