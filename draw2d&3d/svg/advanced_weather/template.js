(function (global) {
  var CONFIG = Object.create(null)
  var BKG = CONFIG.BKG = {
    cloud: '#7D8A9D',
    cloudnight: '#242A43',
    sunshinenight: '#03062B',
    sunshine: '#138CF8'
  }
  //多语言
  var LOCALE = {
    'zh-CN': {
      airQuality: '空气质量',
      airIndex: '空气指数',
      pollution: '污染指数',
      comfort: '舒适度',
      humidity: '空气湿度',
      bodyTemp: '体感温度',
      uvIndex: '紫外线指数',
      windSpeedPress: '风速和气压',
      windDirection: '风向',
      windPower: '风力',
      windPowerUnit: '{1}级',
      windSpeed: '风速',
      airPress: '气压',
      morning: '早上',
      night: '傍晚',
      sunriseSet: '日出日落',
      lifeIndex: '生活指数',
      dressingIndex: '穿衣指数',
      exerciseIndex: '运动指数',
      coldIndex: '感冒指数',
      carWashIndex: '洗车指数',
      tourismIndex: '旅游指数',
      comfortIndex: '舒适度指数',
    },
    'en': {
      airQuality: 'Air Quality',
      airIndex: 'AQI',
      pollution: 'API',
      comfort: 'Comfort Level',
      humidity: 'Humidity',
      bodyTemp: 'Feels like',
      uvIndex: 'UV index',
      windSpeedPress: 'Wind & Pressure',
      windDirection: 'Direction',
      windPower: 'Wind',
      windPowerUnit: 'Scale {1}',
      windSpeed: 'Speed',
      airPress: 'Pressure',
      morning: 'Morning',
      night: 'Evening',
      sunriseSet: 'Sunrise & Sunset',
      lifeIndex: 'Lifestyle',
      dressingIndex: 'Clothing',
      exerciseIndex: 'Exercise',
      coldIndex: 'Cold Risk',
      carWashIndex: 'Car Wash',
      tourismIndex: 'Travel',
      comfortIndex: 'Comfort',
    },
    'ja': {
      airQuality: '空気質',
      airIndex: '空気質指数',
      pollution: '大気汚染指数',
      comfort: '快適度',
      humidity: '湿度',
      bodyTemp: '体感温度',
      uvIndex: 'UV指数',
      windSpeedPress: '風速・気圧',
      windDirection: '風向',
      windPower: '風力',
      windPowerUnit: '階級{1}',
      windSpeed: '風速',
      airPress: '気圧',
      morning: '朝',
      night: '夜',
      sunriseSet: '日の出・日の入',
      lifeIndex: '生活指数',
      dressingIndex: '服装指数',
      exerciseIndex: '運動指数',
      coldIndex: '風引き指数',
      carWashIndex: '洗車指数',
      tourismIndex: 'お出掛指数',
      comfortIndex: '快適度指数',
    }
  }
  //穿衣指数
  var DRESSING_INDEX = {
    '炎热':{
      'en': 'Hot',
      'ja': 'とても暑い'
    },
    '热':{
      'en': 'Warm',
      'ja': '暑い'
    },
    '舒适':{
      'en': 'Mild',
      'ja': '快適'
    },
    '较舒适':{
      'en': 'Moderate',
      'ja': 'やや快適'
    },
    '较冷': {
      'en': 'Cool',
      'ja': '肌寒い'
    },
    '冷':{
      'en': 'Cold',
      'ja': '寒い'
    },
    '寒冷':{
      'en': 'Freezing',
      'ja': 'とても寒い'
    }
  }
  //运动指数
  var EXERCISE_INDEX = {
    '适宜': {
      'en': 'Suitable',
      'ja': '適する'
    },
    '较适宜': {
      'en': 'Moderate',
      'ja': 'やや適する'
    },
    '较不宜': {
      'en': 'Unsuitable',
      'ja': 'やや不適'
    }
  }
  //感冒指数
  var COLD_INDEX = {
    '少发': {
      'en': 'Very low',
      'ja': '引きにくい'
    },
    '较易发':{
      'en': 'Low',
      'ja': '引きやすい'
    },
    '易发':{
      'en':'High',
      'ja': '注意'
    },
    '极易发':{
      'en': 'Very high',
      'ja': '要注意'
    }
  }
  // 洗车指数
  var CAR_WASH_INDEX = {
    '适宜': {
      'en': 'Suggested',
      'ja': '適する'
    },
    '较适宜': {
      'en': 'Suitable',
      'ja': 'やや適する'
    },
    '较不宜': {
      'en': 'Moderate',
      'ja': 'やや不適'
    },
    '不宜': {
      'en': 'Unsuitable',
      'ja': '適さない'
    }
  }
  // 旅游指数
  var TOURISM_INDEX = {
    '适宜': {
      'en': 'Suggested',
      'ja': '適する'
    },
    '较适宜': {
      'en': 'Suitable',
      'ja': 'やや適する'
    },
    '一般': {
      'en': 'General',
      'ja': 'ふつう'
    },
    '较不宜': {
      'en': 'Moderate',
      'ja': 'やや不適'
    },
    '不适宜': {
      'en': 'Unsuitable',
      'ja': '適さない'
    }
  }
  // 舒适度指数
  var COMFORT_INDEX = {
    '舒适': {
      'en': 'Very good',
      'ja': '快適'
    },
    '较舒适': {
      'en': 'Good',
      'ja': 'やや快適'
    },
    '较不舒适': {
      'en': 'Mild',
      'ja': 'やや不快'
    },
    '很不舒适': {
      'en': 'Moderate',
      'ja': 'とても不快'
    },
    '极不舒适': {
      'en': 'Bad',
      'ja': '極めて不快'
    },
    '不舒适': {
      'en': 'Very bad',
      'ja': '不快'
    },
    '非常不舒适': {
      'en': 'Miserable',
      'ja': '非常に不快'
    }
  }
  // 空气质量
  var AIR_QUALITY = {
    '优': {
      'en': 'Excellent',
      'ja': '優良'
    },
    '良': {
      'en': 'Good',
      'ja': '良'
    },
    '轻度污染': {
      'en': 'Mild',
      'ja': '軽度'
    },
    '中度污染': {
      'en': 'Moderate',
      'ja': '中程度'
    },
    '重度污染': {
      'en': 'Heavy',
      'ja': '重度'
    },
    '严重污染': {
      'en': 'Hazardous',
      'ja': '深刻'
    }
  }
  var CODE = CONFIG.CODE = {
    '100': { icon: 'sunny', type: 'sunshine' },// 晴
    '101': { icon: 'cloudy', type: 'cloudy' },//多云
    '102': { icon: 'cloudy', type: 'sunshine' },//少云
    '103': { icon: 'overcast', type: 'sunshine' },//  晴间多云
    '104': { icon: 'overcast', type: 'cloudy' },//阴
    '200': { icon: 'sunny', type: 'sunshine' },//有风
    '201': { icon: 'sunny', type: 'sunshine' },//平静
    '202': { icon: 'sunny', type: 'sunshine' },// 微风
    '203': { icon: 'sunny', type: 'sunshine' },// 和风
    '204': { icon: 'sunny', type: 'sunshine' },//清风
    '205': { icon: 'severestorm', type: 'cloudy' },//强风/劲风
    '206': { icon: 'severestorm', type: 'cloudy' },//  疾风
    '207': { icon: 'severestorm', type: 'cloudy' },//大风
    '208': { icon: 'severestorm', type: 'cloudy' },//烈风
    '209': { icon: 'severestorm', type: 'cloudy' },//  风暴
    '210': { icon: 'severestorm', type: 'cloudy' },//狂爆风
    '211': { icon: 'severestorm', type: 'cloudy' },//  飓风
    '212': { icon: 'severestorm', type: 'cloudy' },//  龙卷风
    '213': { icon: 'severestorm', type: 'cloudy' },//热带风暴
    '300': { icon: 'shower', type: 'cloudy' },//   阵雨
    '301': { icon: 'shower', type: 'cloudy' },//   强阵雨
    '302': { icon: 'thundershower', type: 'cloudy' },//    雷阵雨
    '303': { icon: 'thundershower', type: 'cloudy' },//强雷阵雨
    '304': { icon: 'thundershowerhail', type: 'cloudy' },//    雷阵雨伴有冰雹
    '305': { icon: 'lightrain', type: 'cloudy' },//    小雨
    '306': { icon: 'moderaterain', type: 'cloudy' },//中雨
    '307': { icon: 'heavysnow', type: 'cloudy' },//    大雨
    '308': { icon: 'lightrain', type: 'cloudy' },//    极端降雨
    '309': { icon: 'lightrain', type: 'cloudy' },//毛毛雨/细雨
    '310': { icon: 'Storm', type: 'cloudy' },//    暴雨
    '311': { icon: 'Storm', type: 'cloudy' },//    大暴雨
    '312': { icon: 'Storm', type: 'cloudy' },//    特大暴雨
    '313': { icon: 'icerain', type: 'cloudy' },//冻雨
    '400': { icon: 'lightsnow', type: 'cloudy' },//    小雪
    '401': { icon: 'moderatesnow', type: 'cloudy' },// 中雪
    '402': { icon: 'heavysnow', type: 'cloudy' },//    大雪
    '403': { icon: 'blizzard', type: 'cloudy' },//暴雪
    '404': { icon: 'sleet', type: 'cloudy' },//雨夹雪
    '405': { icon: 'sleet', type: 'cloudy' },//雨雪天气
    '406': { icon: 'sleet', type: 'cloudy' },//阵雨夹雪
    '407': { icon: 'snowflurry', type: 'cloudy' },//   阵雪
    '500': { icon: 'foggy', type: 'cloudy' },//    薄雾
    '501': { icon: 'foggy', type: 'cloudy' },//   雾
    '502': { icon: 'haze', type: 'cloudy' },//    霾
    '503': { icon: 'sand', type: 'cloudy' },//    扬沙
    '504': { icon: 'dust', type: 'cloudy' },//浮尘
    '507': { icon: 'duststorm', type: 'cloudy' },//   沙尘暴
    '508': { icon: 'stduststorm', type: 'cloudy' },// 强沙尘暴
    '900': { icon: 'sunny', type: 'sunshine' },//    热
    '901': { icon: 'overcast', type: 'cloudy' },//    冷
    '999': { icon: 'sunny', type: 'cloudy' }// 未知
  }
  var Template = Object.create(null)
  /**
   * 正常主面板
   */
  Template.mainTemplate = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      aqi: data.aqi || '--',
      peakTemp: data.peakTemp || '--',
      weather: data.weather || '--',
      temp:data.temp || '--'
    }
    var isShowAqi = data.aqi ? 'visible' : 'hidden'
    var isShowAir = data.airQuality ? 'visible': 'hidden'
    return '<g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect x="0" y="0" width="400" height="240" stroke = "'+BKG[data.background]+'" fill="'+BKG[data.background]+'"/>\
    <image x="0" y="0" width="400" height="240" xlink:href="'+data.backgroundUrl+'" ></image>\
    <foreignObject x="288" y="42" width="95" height="95">\
      <div class="icon-' + CODE[data.code].icon + '" style="zoom:0.75;"></div>\
    </foreignObject>\
    <g>\
      <use x="26" y="15" xlink:href="#svg-weather-position" />\
    </g>\
    <foreignObject x="50" y="10" width="240" height="70" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
    <div class = "js-body__address" style="font-size: 17px; color: #fff;">\
    <p style="margin: 0; word-wrap: break-word;">' + options.address + '</p>\
    </div>\
    </foreignObject>\
    <foreignObject x="210" y="174" width="190" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
      <p style="margin: 0; display: inline; font-size: 15px; color: #fff; visibility: '+isShowAqi+'">'+locale.airIndex+' '+item.aqi+'</p>\
      <p style="margin: 0; display: inline; font-size: 15px; color: #fff; background: rgba(255,255,255,.2);padding: 2px; visibility:' + isShowAir + ';">' + data.airQuality + '</p>\
    </foreignObject>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="16.0000042" font-weight="normal" line-spacing="22" fill="#FFFFFF">\
        <tspan x="210" y="216">'+item.peakTemp + data.currentTemp +' '+ item.weather+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="80.7996431" font-weight="500" line-spacing="90" fill="#FFFFFF" x="20.3745388" y="218">\
    '+item.temp+'<tspan font-size="53.8664263" line-spacing="70" dy="-18">'+data.currentTemp+'</tspan>\
    </text>\
    </g>'
  }
  /**
   * 水平主面板
   */
  Template.horMainTemplate = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      aqi: data.aqi || '--',
      peakTemp: data.peakTemp || '--',
      weather: data.weather || '--',
      temp:data.temp || '--'
    }
    var isShowAir = data.airQuality ? 'visible': 'hidden'
    var isShowAqi = data.aqi ? 'visible' : 'hidden'
    return '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect x="0" y="0" width="400" height="140" stroke = "'+BKG[data.background]+'" fill="'+BKG[data.background]+'"/>\
    <image x="0" y="0" width="400" height="140" xlink:href="'+data.backgroundUrl+'" ></image>\
    <foreignObject x="306" y="14" width="80" height="72">\
      <div class="icon-' + CODE[data.code].icon + '" style="zoom:0.61;"></div>\
    </foreignObject>\
    <g>\
        <use x="26" y="14" xlink:href="#svg-weather-position" />\
    </g>\
    <foreignObject x="50" y="11" width="255" height="58" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
    <div class = "js-body__address" style="font-size: 16px; color: #fff;">\
    <p style="margin: 0; word-wrap: break-word;">' + options.address + '</p>\
    </div>\
    </foreignObject>\
    <foreignObject x="185" y="84" width="215" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
      <p style="margin: 0; display: inline; font-size: 14px; color: #fff; visibility: '+isShowAqi+'">'+locale.airIndex+' '+item.aqi+'</p>\
      <p style="margin: 0; display: inline; font-size: 14px; color: #fff; background: rgba(255,255,255,.2);padding: 2px; visibility:' + isShowAir + ';">' + data.airQuality + '</p>\
    </foreignObject>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="normal" line-spacing="22" fill="#FFFFFF">\
        <tspan x="185" y="125">'+item.peakTemp + data.currentTemp +' '+ item.weather+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="70" font-weight="500" line-spacing="90" fill="#FFFFFF" x="22" y="126">\
    '+item.temp+'<tspan font-size="44" line-spacing="70" dy="-18">'+data.currentTemp+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 垂直主面板
   */
  Template.verMainTemplate = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      aqi: data.aqi || '--',
      peakTemp: data.peakTemp || '--',
      weather: data.weather || '--',
      temp:data.temp || '--'
    }
    var isShowAir = data.airQuality ? 'visible': 'hidden'
    var isShowAqi = data.aqi ? 'visible' : 'hidden'
    return '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect x="0" y="0" width="160" height="240" stroke = "'+BKG[data.background]+'" fill="'+BKG[data.background]+'"/>\
    <image x="0" y="0" width="160" height="240" xlink:href="'+data.backgroundUrl+'" ></image>\
    <foreignObject x="22" y="166" width="136" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
      <p style="margin: 0; display: inline; font-size: 14px; color: #fff; visibility: '+isShowAqi+'">'+locale.airIndex+' '+item.aqi+'</p>\
    </foreignObject>\
    <foreignObject x="24" y="189" width="136" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
      <p style="margin: 0; display: inline; font-size: 14px; color: #fff; background: rgba(255,255,255,.2); visibility:' + isShowAir + ';">' + data.airQuality + '</p>\
    </foreignObject>\
    <foreignObject x="22" y="211" width="136" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
      <p style="margin: 0; display: inline; font-size: 14px; color: #fff;">' +item.peakTemp + data.currentTemp +' '+ item.weather+ '</p>\
    </foreignObject>\
    <foreignObject x="88" y="53" width="71" height="71">\
      <div class="icon-' + CODE[data.code].icon + '" style="zoom:0.50;"></div>\
    </foreignObject>\
    <g>\
      <use x="14" y="11" xlink:href="#svg-weather-position" />\
    </g>\
    <foreignObject x="30" y="8" width="130" height="50" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica">\
    <div class = "js-body__address" style="font-size: 12px; color: #fff;">\
    <p style="margin: 0; word-wrap: break-word; line-height:16px;">' + options.address + '</p>\
    </div>\
    </foreignObject>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="56" font-weight="500" line-spacing="60" fill="#FFFFFF" x="20" y="161">\
    '+item.temp+'<tspan font-size="40" line-spacing="40" dy="-15">'+data.currentTemp+'</tspan>\
    </text>\
  </g>'
  }
  var MainDetail = Object.create(null)
  /**
   * 主面板空气质量
   */
  MainDetail.airQuality = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      airQuality: data.airQuality || '--',
      aqi: data.aqi || '--',
      pm10: data.aqiDetail.pm10 || '--',
      pm25: data.aqiDetail.pm25 || '--',
      no2: data.aqiDetail.no2 || '--',
      so2: data.aqiDetail.so2 || '--',
      o3: data.aqiDetail.o3 || '--',
      co: data.aqiDetail.co || '--',
    }
    return '<g class="js-content__detail js-detail__airquality" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="22" y="40">'+locale.airQuality+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13.9654627" font-weight="normal" line-spacing="20" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="117" y="73">'+locale.pollution+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13.9654627" font-weight="normal" line-spacing="20" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="119" y="129">'+item.airQuality+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="84" y="212">0</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="141" y="212">500</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="29.9259895" font-weight="normal" line-spacing="42" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="118" y="170">'+item.aqi+'</tspan>\
    </text>\
    <g transform="rotate(120,100,100)">\
      <circle class="js-air-bkg" r="52" cx="126" cy="63" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff"   stroke-opacity="0.5" stroke-width = "8"></circle>\
      <circle class="js-air-process" r="52" cx="126" cy="63" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff" stroke-width = "8"></circle>\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="239" y="71.574279">PM10</tspan>\
        <tspan x="239" y="98.574279">PM2.5</tspan>\
        <tspan x="239" y="125.574279">NO<tspan font-size="10">2</tspan></tspan>\
        <tspan x="239" y="152.574279">SO<tspan font-size="10">2</tspan></tspan>\
        <tspan x="239" y="179.574279">O<tspan font-size="10">3</tspan></tspan>\
        <tspan x="239" y="206.574279">CO</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="314" y="71.5543261">'+item.pm10+'</tspan>\
        <tspan x="314" y="98.5543261">'+item.pm25+'</tspan>\
        <tspan x="314" y="125.554326">'+item.no2+'</tspan>\
        <tspan x="314" y="152.554326">'+item.so2+'</tspan>\
        <tspan x="314" y="179.554326">'+item.o3+'</tspan>\
        <tspan x="314" y="206.554326">'+item.co+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 主面板舒适度
   */
  MainDetail.comfort = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      humidity: data.humidity || '--',
      fl: data.fl || '--',
      uvIndex: data.uvIndex || '--'
    }
    return '<g class="js-content__detail js-detail__comform" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="22" y="40">'+locale.comfort+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13.9654627" font-weight="normal" line-spacing="20" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="120" y="73">'+locale.humidity+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="84" y="212">0</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="141" y="212">100</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="22" font-weight="normal" line-spacing="42" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="118" y="155" font-size="34">'+item.humidity+'</tspan>%\
    </text>\
    <g transform="rotate(120,100,100)">\
      <circle class="js-air-bkg" r="52" cx="126" cy="63" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff" stroke-opacity="0.5" stroke-width = "8"></circle>\
      <circle class="js-air-process" r="52" cx="126" cy="63" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff" stroke-width = "8"></circle>\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="239" y="123.574279">'+locale.bodyTemp+'</tspan>\
        <tspan x="239" y="150.574279">'+locale.uvIndex+'</tspan>\
        <tspan x="239" y="177.574279"></tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="313" y="123.554326">'+item.fl+data.currentTemp+'</tspan>\
        <tspan x="313" y="150.554326">'+item.uvIndex+'</tspan>\
        <tspan x="313" y="177.554326"></tspan>\
    </text>\
  </g>'
  }
  /**
   * 主面板风速和气压
   */
  MainDetail.windSpeed = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      windDirection: data.windDirection || '--',
      wind: data.wind || '--',
      windSpeed: data.windSpeed+data.windSpeedUnit || '--',
      pressure: data.pressure ? (Math.round(data.pressure * 100) / 100) + data.pressureUnit : '--'
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0.000000, 0.000000)">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="22" y="40">'+locale.windSpeedPress+'</tspan>\
    </text>\
    <g>\
    <use x="67" y="75" xlink:href="#svg-weather-windspeed" />\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="239" y="97.574279">'+locale.windDirection+'</tspan>\
        <tspan x="239" y="124.574279">'+locale.windPower+'</tspan>\
        <tspan x="239" y="151.574279">'+locale.windSpeed+'</tspan>\
        <tspan x="239" y="178.574279">'+locale.airPress+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="312" y="98.5543261">'+item.windDirection+'</tspan>\
        <tspan x="312" y="125.554326">'+locale.windPowerUnit.replace(/{\w+}/, item.wind)+'</tspan>\
        <tspan x="312" y="152.554326">'+item.windSpeed+'</tspan>\
        <tspan x="312" y="179.554326">'+item.pressure+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 主面板日出日落
   */
  MainDetail.sunrise = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      sunriseFormat: data.sunriseFormat || '--',
      sunsetFormat: data.sunsetFormat || '--'
    }
    return '<g class="js-content__detail js-content__sunrise" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="220" rx="8"></rect>\
    <g transform="translate(40,70)">\
        <rect x="43" width="220" class="js-sunrise__rate" height="104" fill= "rgb(255,255,255)" style="clip-path: url(#svgPath);" fill-opacity="0.2"/>\
        <clipPath id="svgPath">\
          <path d="M 43.93046524489161,103.21067843941209 A 118,118 0  0  1 278.0695347551084,103.21067843941209"></path>\
        </clipPath>\
        <path fill="transparent" stroke="rgb(255, 255, 255)" stroke-dasharray="4 3" stroke-width="0.98" d="M 43.93046524489161,103.21067843941209 A 118,118 0  0  1 278.0695347551084,103.21067843941209"></path>\
        <rect y="104" width="322" height="1" stroke="rgb(255, 255, 255)" ></rect>\
        <use x="32" y="104" class="js-sunrise__sun" xlink:href="#svg-weather-sun" transform="rotate(0,161,118)"/>\
        <rect y="105" width="322" height="20" fill="'+data.bkgColor+'">\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="56" y="196">'+locale.morning+' '+item.sunriseFormat+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="16" fill="#FFFFFF">\
        <tspan x="294" y="196">'+locale.night+' '+item.sunsetFormat+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="22" y="40">'+locale.sunriseSet+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 主面板生活指数
   */
  MainDetail.living = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var lifestyle = data.lifestyle
    var item = {
      drsg: (options.lang !=='zh-CN' ? DRESSING_INDEX[lifestyle.drsg][options.lang] : lifestyle.drsg) || '--',
      cw: (options.lang !=='zh-CN' ? CAR_WASH_INDEX[lifestyle.cw][options.lang] : lifestyle.cw) || '--',
      sport: (options.lang !=='zh-CN' ? EXERCISE_INDEX[lifestyle.sport][options.lang] : lifestyle.sport) || '--',
      trav: (options.lang !=='zh-CN' ? TOURISM_INDEX[lifestyle.trav][options.lang] : lifestyle.trav) || '--',
      flu: (options.lang !=='zh-CN' ? COLD_INDEX[lifestyle.flu][options.lang] : lifestyle.flu) || '--',
      comf: (options.lang !=='zh-CN' ? COMFORT_INDEX[lifestyle.comf][options.lang] : lifestyle.comf) || '--',
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
        <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="240"></rect>\
        <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="220" rx="8"></rect>\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
            <tspan x="22" y="40">'+locale.lifeIndex+'</tspan>\
        </text>\
        <g transform="translate(60.000000, 60.500000)">\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="23" y="49.074279">'+locale.dressingIndex+'</tspan>\
            </text>\
            <use x="10" y="0"  xlink:href="#svg-weather-dressingIndex" />\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
                <tspan x="23" y="64.074279" text-anchor="middle">'+item.drsg+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="23" y="134.074279">'+locale.carWashIndex+'</tspan>\
            </text>\
            <use x="10" y="85"  xlink:href="#svg-weather-carWashIndex" />\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
                <tspan x="23" y="149.074279" text-anchor="middle">'+item.cw+'</tspan>\
            </text>\
        </g>\
        <g transform="translate(161.000000, 61.000000)">\
            <use x="24" y="85" xlink:href="#svg-weather-tourismIndex" />\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="39" y="48.574279">'+locale.exerciseIndex+'</tspan>\
            </text>\
            <use x="24" y="0"  xlink:href="#svg-weather-exerciseIndex" />\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
                <tspan x="39" y="63.574279" text-anchor="middle">'+item.sport+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="39" y="133.574279">'+locale.tourismIndex+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
                <tspan x="39" y="149.574279" text-anchor="middle">'+item.trav+'</tspan>\
            </text>\
        </g>\
        <g transform="translate(285.000000, 61.000000)">\
            <use x="15" y="0" xlink:href="#svg-weather-coldIndex" />\
            <use x="15" y="85" xlink:href="#svg-weather-comfortIndex" />\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="30" y="48.574279">'+locale.coldIndex+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
                <tspan x="30" y="63.574279" text-anchor="middle">'+item.flu+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="24" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="30" y="133.574279">'+locale.comfortIndex+'</tspan>\
            </text>\
            <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF" text-anchor="middle">\
                <tspan x="30" y="148.574279" text-anchor="middle">'+item.comf+'</tspan>\
            </text>\
        </g>\
    </g>'
  }
  Template.MainDetail = MainDetail
  var HorMainDetail = Object.create(null)
  /**
   * 水平主面板空气质量
   */
  HorMainDetail.airQuality = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      pm10: data.aqiDetail.pm10 || '--',
      pm25: data.aqiDetail.pm25 || '--',
      no2: data.aqiDetail.no2 || '--',
      so2: data.aqiDetail.so2 || '--',
      o3: data.aqiDetail.o3 || '--',
      co: data.aqiDetail.co || '--',
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="140"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="120" rx="8"></rect>\
    <g transform="translate(50, 45)" fill="#FFFFFF" font-size="11.9703987" line-spacing="26">\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="normal">\
            <tspan x="0" y="13">PM10</tspan>\
            <tspan x="0" y="40">PM2.5</tspan>\
            <tspan x="0" y="67">NO<tspan font-size="9">2</tspan></tspan>\
        </text>\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="500">\
            <tspan x="75" y="13">'+item.pm10+'</tspan>\
            <tspan x="75" y="40">'+item.pm25+'</tspan>\
            <tspan x="75" y="67">'+item.no2+'</tspan>\
        </text>\
    </g>\
    <g transform="translate(215, 45)" fill="#FFFFFF" font-size="11.9703987" line-spacing="26">\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="normal">\
            <tspan x="10" y="13">SO<tspan font-size="9">2</tspan></tspan>\
            <tspan x="10" y="40">O<tspan font-size="9">3</tspan></tspan>\
            <tspan x="10" y="67">CO</tspan>\
        </text>\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="500">\
            <tspan x="85" y="13">'+item.so2+'</tspan>\
            <tspan x="85" y="40">'+item.o3+'</tspan>\
            <tspan x="85" y="67">'+item.co+'</tspan>\
        </text>\
    </g>\
    <text xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="500" line-spacing="16" fill="#FFFFFF">\
        <tspan x="19" y="33">'+locale.airQuality+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 水平主面板舒适度
   */
  HorMainDetail.comfort = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      humidity: data.humidity || '--',
      fl: data.fl || '--',
      uvIndex: data.uvIndex || '--'
    }
    var isCn = options.lang === 'zh-CN'? 1: 0
    var isEn = options.lang === 'en'? 1: 0
    var isJa = options.lang === 'ja'? 1:0
    return '<g class="js-content__detail js-detail__comform" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="140"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="120" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="50" y="73">'+locale.bodyTemp+'</tspan>\
        <tspan x="50" y="100">'+locale.uvIndex+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="141" y="73">'+item.fl+data.currentTemp+'</tspan>\
        <tspan x="141" y="100">'+item.uvIndex+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="500" line-spacing="16" fill="#FFFFFF">\
        <tspan x="19" y="33">'+locale.comfort+'</tspan>\
    </text>\
    <g transform="translate(138 14)">\
      <g transform="rotate(120,100,100)scale(0.65)translate(4,-4)">\
      <circle class="js-air-bkg" r="52" cx="62" cy="105" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke-opacity="0.5" stroke="#fff" stroke-width = "8"></circle>\
      <circle class="js-air-process" r="52" cx="62" cy="105" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff" stroke-width = "8"></circle>\
      </g>\
      <text opacity="'+isCn+'" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="14" fill="#FFFFFF">\
        <tspan x="94" y="48">空</tspan>\
        <tspan x="94" y="63">气</tspan>\
        <tspan x="94" y="78">湿</tspan>\
        <tspan x="94" y="93">度</tspan>\
      </text>\
      <text opacity="'+isJa+'" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="14" fill="#FFFFFF">\
        <tspan x="94" y="66">湿</tspan>\
        <tspan x="94" y="81">度</tspan>\
      </text>\
      <text opacity="'+isEn+'"  transform="rotate(90,94,51)" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="14" fill="#FFFFFF">\
        <tspan x="84" y="51">Humidity</tspan>\
      </text>\
      <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="normal" line-spacing="42" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="158" y="77" font-size="25">'+item.humidity+'</tspan>%\
      </text>\
    </g>\
  </g>'
  }
  /**
   * 水平主面板风速和气压
   */
  HorMainDetail.windSpeed = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      windDirection: data.windDirection || '--',
      wind: data.wind || '--',
      windSpeed: data.windSpeed+data.windSpeedUnit || '--',
      pressure: data.pressure ? (Math.round(data.pressure * 100) / 100) + data.pressureUnit : '--'
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="140"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="120" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="224" y="72">'+locale.windDirection+'</tspan>\
        <tspan x="224" y="99">'+locale.windPower+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="50" y="72">'+locale.windSpeed+'</tspan>\
        <tspan x="50" y="99">'+locale.airPress+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="315" y="72">'+item.windDirection+'</tspan>\
        <tspan x="315" y="99">'+locale.windPowerUnit.replace(/{\w+}/, item.wind)+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="141" y="72">'+item.windSpeed+'</tspan>\
        <tspan x="141" y="99">'+item.pressure+'</tspan>\
    </text>\
    <text xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="500" line-spacing="16" fill="#FFFFFF">\
        <tspan x="19" y="33">'+locale.windSpeedPress+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 水平主面板日出日落
   */
  HorMainDetail.sunrise = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      sunriseFormat: data.sunriseFormat || '--',
      sunsetFormat: data.sunsetFormat || '--'
    }
    return '<g class="js-content__detail js-content__sunrise" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="140"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="120" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="225" y="71">'+locale.morning+'</tspan>\
        <tspan x="225" y="98">'+locale.night+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="300" y="71">'+item.sunriseFormat+'</tspan>\
        <tspan x="300" y="98">'+item.sunsetFormat+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="500" line-spacing="16" fill="#FFFFFF">\
        <tspan x="19" y="33">'+locale.sunriseSet+'</tspan>\
    </text>\
    <g transform="translate(10,50)scale(0.55)">\
        <rect class="js-sunrise__rate" x="43" width="220" height="104" fill= "rgb(255,255,255)" style="clip-path: url(#svgPath2);" fill-opacity="0.2"/>\
        <clipPath id="svgPath2">\
          <path d="M 43.93046524489161,103.21067843941209 A 118,118 0  0  1 278.0695347551084,103.21067843941209"></path>\
        </clipPath>\
        <path fill="transparent" stroke="rgb(255, 255, 255)" stroke-dasharray="4 3" stroke-width="0.98" d="M 43.93046524489161,103.21067843941209 A 118,118 0  0  1 278.0695347551084,103.21067843941209"></path>\
        <rect y="104" width="260" x="31" height="1" stroke="rgb(255, 255, 255)" ></rect>\
        <use x="32" y="104" class="js-sunrise__sun" xlink:href="#svg-weather-sun" transform="rotate(90,161,118)"/>\
        <rect y="105" width="260" x="31" height="20" fill="'+data.bkgColor+'">\
    </g>\
  </g>'
  }
  /**
   * 水平主面板生活指数
   */
  HorMainDetail.living = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var lifestyle = data.lifestyle
    var item = {
      drsg: (options.lang !=='zh-CN' ? DRESSING_INDEX[lifestyle.drsg][options.lang] : lifestyle.drsg) || '--',
      cw: (options.lang !=='zh-CN' ? CAR_WASH_INDEX[lifestyle.cw][options.lang] : lifestyle.cw) || '--',
      sport: (options.lang !=='zh-CN' ? EXERCISE_INDEX[lifestyle.sport][options.lang] : lifestyle.sport) || '--',
      trav: (options.lang !=='zh-CN' ? TOURISM_INDEX[lifestyle.trav][options.lang] : lifestyle.trav) || '--',
      flu: (options.lang !=='zh-CN' ? COLD_INDEX[lifestyle.flu][options.lang] : lifestyle.flu) || '--',
      comf: (options.lang !=='zh-CN' ? COMFORT_INDEX[lifestyle.comf][options.lang] : lifestyle.comf) || '--',
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="400" height="140"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="380" height="120" rx="8"></rect>\
    <g transform="translate(50, 45)" fill="#FFFFFF" font-size="11.9703987" line-spacing="26">\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="normal">\
            <tspan x="0" y="13">'+locale.dressingIndex+'</tspan>\
            <tspan x="0" y="40">'+locale.exerciseIndex+'</tspan>\
            <tspan x="0" y="67">'+locale.coldIndex+'</tspan>\
        </text>\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="500">\
            <tspan x="75" y="13">'+item.drsg+'</tspan>\
            <tspan x="75" y="40">'+item.sport+'</tspan>\
            <tspan x="75" y="67">'+item.flu+'</tspan>\
        </text>\
    </g>\
    <g transform="translate(215, 45)" fill="#FFFFFF" font-size="11.9703987" line-spacing="26">\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="normal">\
            <tspan x="0" y="13">'+locale.carWashIndex+'</tspan>\
            <tspan x="0" y="40">'+locale.tourismIndex+'</tspan>\
            <tspan x="0" y="67">'+locale.comfortIndex+'</tspan>\
        </text>\
        <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-weight="500">\
            <tspan x="75" y="13">'+item.cw+'</tspan>\
            <tspan x="75" y="40">'+item.trav+'</tspan>\
            <tspan x="75" y="67">'+item.comf+'</tspan>\
        </text>\
    </g>\
    <text xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="14" font-weight="500" line-spacing="16" fill="#FFFFFF">\
    <tspan x="19" y="33">'+locale.lifeIndex+'</tspan>\
    </text>\
  </g>'
  }
  Template.HorMainDetail = HorMainDetail
  var VerMainDetail = Object.create(null)
  /**
   * 垂直主面板空气质量
   */
  VerMainDetail.airQuality = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      pm10: data.aqiDetail.pm10 || '--',
      pm25: data.aqiDetail.pm25 || '--',
      no2: data.aqiDetail.no2 || '--',
      so2: data.aqiDetail.so2 || '--',
      o3: data.aqiDetail.o3 || '--',
      co: data.aqiDetail.co || '--',
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="160" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="140" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="13" y="35">'+locale.airQuality+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="26" y="71">PM10</tspan>\
        <tspan x="26" y="98">PM2.5</tspan>\
        <tspan x="26" y="125">NO<tspan font-size="9">2</tspan></tspan>\
        <tspan x="26" y="152">SO<tspan font-size="9">2</tspan></tspan>\
        <tspan x="26" y="179">O<tspan font-size="9">3</tspan></tspan>\
        <tspan x="26" y="206">CO</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="95" y="71">'+item.pm10+'</tspan>\
        <tspan x="95" y="98">'+item.pm25+'</tspan>\
        <tspan x="95" y="125">'+item.no2+'</tspan>\
        <tspan x="95" y="152">'+item.so2+'</tspan>\
        <tspan x="95" y="179">'+item.o3+'</tspan>\
        <tspan x="95" y="206">'+item.co+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 垂直主面板舒适度
   */
  VerMainDetail.comfort = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      humidity: data.humidity || '--',
      fl: data.fl || '--',
      uvIndex: data.uvIndex || '--'
    }
    return '<g class="js-content__detail js-detail__comform" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="160" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="140" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="13" y="35">'+locale.comfort+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="26" y="185">'+locale.bodyTemp+'</tspan>\
        <tspan x="26" y="212">'+locale.uvIndex+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="95" y="185">'+item.fl+data.currentTemp+'</tspan>\
        <tspan x="95" y="212">'+item.uvIndex+'</tspan>\
    </text>\
    <g transform = "translate(-1,0)">\
      <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="14" fill="#FFFFFF" text-anchor="middle">\
          <tspan x="81" y="66">'+locale.humidity+'</tspan>\
      </text>\
      <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="10" fill="#FFFFFF">\
          <tspan x="55" y="159">0</tspan>\
      </text>\
      <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="10" fill="#FFFFFF">\
          <tspan x="92" y="160">100</tspan>\
      </text>\
      <g transform="rotate(120,100,100)scale(0.65)">\
        <circle class="js-air-bkg" r="52" cx="182" cy="171" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke-opacity="0.5" stroke="#fff" stroke-width = "8"></circle>\
        <circle class="js-air-process" r="52" cx="182" cy="171" fill="transparent" stroke-dasharray="326.56"  stroke-dashoffset="54.42" stroke-linecap="round" stroke="#fff" stroke-width = "8"></circle>\
      </g>\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="13.93" font-weight="normal" line-spacing="30" fill="#FFFFFF" text-anchor="middle">\
        <tspan x="81" y="120" font-size="24.93">'+item.humidity+'</tspan>%\
    </text>\
  </g>'
  }
  /**
   * 垂直主面板风速和气压
   */
  VerMainDetail.windSpeed = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      windDirection: data.windDirection || '--',
      wind: data.wind || '--',
      windSpeed: data.windSpeed+data.windSpeedUnit || '--',
      pressure: data.pressure ? (Math.round(data.pressure * 100) / 100) + data.pressureUnit : '--'
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="160" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="140" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="18" y="125">'+locale.windDirection+'</tspan>\
        <tspan x="18" y="152">'+locale.windPower+'</tspan>\
        <tspan x="18" y="179">'+locale.windSpeed+'</tspan>\
        <tspan x="18" y="206">'+locale.airPress+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="87" y="125">'+item.windDirection+'</tspan>\
        <tspan x="87" y="152">'+locale.windPowerUnit.replace(/{\w+}/, item.wind)+'</tspan>\
        <tspan x="87" y="179">'+item.windSpeed+'</tspan>\
        <tspan x="87" y="206">'+item.pressure+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="13" y="35">'+locale.windSpeedPress+'</tspan>\
    </text>\
    <g>\
        <use x="137" y="125" transform ="scale(0.42)" xlink:href="#svg-weather-windspeed" />\
    </g>\
  </g>'
  }
  /**
   * 垂直主面板日出日落
   */
  VerMainDetail.sunrise = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var item = {
      sunriseFormat: data.sunriseFormat || '--',
      sunsetFormat: data.sunsetFormat || '--'
    }
    return '<g class="js-content__detail js-content__sunrise" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="160" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="140" height="220" rx="8"></rect>\
    <g transform="scale(0.45)translate(16,182)">\
      <rect x="43" width="220" class="js-sunrise__rate" height="118" fill= "rgb(255,255,255)" style="clip-path: url(#svgPath3);" fill-opacity="0.2"/>\
      <clipPath id="svgPath3">\
        <path d="M 43,117.99999999999999 A 118,118 0  0  1 279,117.99999999999999"></path>\
      </clipPath>\
      <path fill="transparent" stroke="rgb(255, 255, 255)" stroke-dasharray="4 3" stroke-width="0.98" d="M 43,117.99999999999999 A 118,118 0  0  1 279,117.99999999999999"></path>\
      <rect y="118" x="32" width="260" height="1" stroke="rgb(255, 255, 255)" ></rect>\
      <use x="32" y="104" class="js-sunrise__sun" xlink:href="#svg-weather-sun" transform="rotate(90,161,118)"/>\
      <rect y="119" x="32" width="260"  height="20" fill="'+data.bkgColor+'">\
    </g>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="13" y="35">'+locale.sunriseSet+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="normal" line-spacing="26" fill="#FFFFFF">\
        <tspan x="26" y="179">'+locale.morning+'</tspan>\
        <tspan x="26" y="206">'+locale.night+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="11.9703987" font-weight="500" line-spacing="26" fill="#FFFFFF">\
        <tspan x="95" y="179">'+item.sunriseFormat+'</tspan>\
        <tspan x="95" y="206">'+item.sunsetFormat+'</tspan>\
    </text>\
  </g>'
  }
  /**
   * 垂直主面板生活指数
   */
  VerMainDetail.living = function (data) {
    var options = this.options
    var locale = LOCALE[options.lang]
    var lifestyle = data.lifestyle
    var item = {
      drsg: (options.lang !=='zh-CN' ? DRESSING_INDEX[lifestyle.drsg][options.lang] : lifestyle.drsg) || '--',
      cw: (options.lang !=='zh-CN' ? CAR_WASH_INDEX[lifestyle.cw][options.lang] : lifestyle.cw) || '--',
      sport: (options.lang !=='zh-CN' ? EXERCISE_INDEX[lifestyle.sport][options.lang] : lifestyle.sport) || '--',
      trav: (options.lang !=='zh-CN' ? TOURISM_INDEX[lifestyle.trav][options.lang] : lifestyle.trav) || '--',
      flu: (options.lang !=='zh-CN' ? COLD_INDEX[lifestyle.flu][options.lang] : lifestyle.flu) || '--',
      comf: (options.lang !=='zh-CN' ? COMFORT_INDEX[lifestyle.comf][options.lang] : lifestyle.comf) || '--',
    }
    return '<g class="js-content__detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
    <rect fill="'+BKG[data.background]+'" stroke="'+BKG[data.background]+'" x="0" y="0" width="160" height="240"></rect>\
    <rect fill-opacity="0.2" fill="#FFFFFF" x="10" y="10" width="140" height="220" rx="8"></rect>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="15.9605267" font-weight="500" line-spacing="22" fill="#FFFFFF">\
        <tspan x="13" y="35">'+locale.lifeIndex+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="normal" line-spacing="21" fill="#FFFFFF">\
        <tspan x="18" y="74">'+locale.dressingIndex+'</tspan>\
        <tspan x="18" y="101">'+locale.exerciseIndex+'</tspan>\
        <tspan x="18" y="128">'+locale.coldIndex+'</tspan>\
        <tspan x="18" y="155">'+locale.carWashIndex+'</tspan>\
        <tspan x="18" y="182">'+locale.tourismIndex+'</tspan>\
        <tspan x="18" y="209">'+locale.comfortIndex+'</tspan>\
    </text>\
    <text font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, Arial, Helvetica Neue, Helvetica" font-size="12" font-weight="500" line-spacing="21" fill="#FFFFFF">\
        <tspan x="87" y="74">'+item.drsg+'</tspan>\
        <tspan x="87" y="101">'+item.sport+'</tspan>\
        <tspan x="87" y="128">'+item.flu+'</tspan>\
        <tspan x="87" y="155">'+item.cw+'</tspan>\
        <tspan x="87" y="182">'+item.trav+'</tspan>\
        <tspan x="87" y="209">'+item.comf+'</tspan>\
    </text>\
  </g>'
  }
  Template.VerMainDetail = VerMainDetail
  global.AdvancedWeatherTemplate = Template
  global.AdvancedWeatherConfig = CONFIG
})(window)
