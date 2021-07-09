(function (global) {
  // 刷新周期
  const REFRESH_CYCLE = [1, 2, 3]
  // 每帧时间
  const FRAME_TIME = 16
  // 档位 - 周期 - 速度 映射
  const GEAR_POSITION_PIXELS_MAP = {
    1: [2, 1],
    2: [1, 1],
    3: [0, 1],
    4: [0, 2],
    5: [0, 3],
    6: [0, 4],
    7: [0, 5],
    8: [0, 6],
    9: [0, 7],
    10: [0, 8]
  }
  function environmentMonitor(wrapper) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ratio = devicePixelRatio / (this.ctx.webkitBackingStorePixelRatio || 1)
    wrapper.appendChild(this.canvas)
  }
  const EP = environmentMonitor.prototype
  /**
   * 渲染界面
   */
  EP.render = function (options) {
    this.props = options || {}
    const { ctx, props } = this
    const scale = props.scale || 1
    const ratio = scale * this.ratio
    const w = props.width * ratio
    const h = props.height * ratio
    ctx.width = w
    ctx.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.imageSmoothingQuality = 'high'
    ctx.save()
    this.setSize(w, h, props.width * scale, props.height * scale)
    const textLabels = this.textLabels = this.getText()
    if(!textLabels.length){
      return
    }
    const params = this.getDrawParams()
    textLabels.length = params.lines
    this.draw({
      textLabels,
      startY: params.startY,
      lineHeight: params.lineHeight
    })
    ctx.scale(ratio, ratio)
  }
  /**
   * 获取绘制行高
   */
  EP.getDrawParams = function(){
    const { ctx } = this
    const textLabels = this.textLabels
    const textLabel = textLabels[0]
    let textRect = this.getMaxHeight(textLabel)
    //计算多行文本的绘制方式
    let startY = textRect.h/2
    const ctxHeight = ctx.height
    let lineHeight = textRect.underLineHeight ? (textRect.h + 2 + textRect.underLineHeight) : textRect.h
    let lines = Math.floor(ctxHeight / lineHeight)
    if(lines >= textLabels.length){
      lines = textLabels.length
    }
    const cellHeight = lines !== 0 ? Math.floor((ctxHeight - lines * lineHeight) / lines) : 0
    lineHeight  = cellHeight ? lineHeight + cellHeight : lineHeight
    //axisY初始值进行重写
    startY = cellHeight ? startY + cellHeight/2 : startY
    return {
      lines: lines,//一页绘制行数
      lineHeight: lineHeight,//行高
      startY: startY,//起点
    }
  }
  /**
   * 绘制
   */
  EP.draw = function(params){
    let {textLabels,startY,lineHeight} = params
    textLabels.forEach((element) => {
      this.drawAlignment(element,startY,lineHeight)
      startY = startY + lineHeight
    })
  }
  /**
   * 获取标签单位及固定文字最大值字号计算行高
   */
  EP.getMaxHeight = function(textLabel){
    const { props } = this
    const text = `${textLabel.key}${textLabel.value}${textLabel.unit}`
    const fontParams = props.labelFont.fontSize > props.valueFont.fontSize ? props.labelFont : props.valueFont
    const newFontParams = fontParams.fontSize > props.unitFont.fontSize ? fontParams : props.unitFont
    return this.getFontHeight(text,newFontParams)
  }
  /**
   * 获取文字行高
   */
  EP.getFontHeight = function(text,fontParams) {
    const { props }  = this
    const scale = (props.scale || 1)
    const ratio = this.ratio * scale
    //防止文字为空
    text = text || 'l'
    text = text.replace(/[\r\n]/g,'').replace(' ','l')
    let { ctx,helperCtx,canvas,helperCanvas } = this
    ctx = helperCtx || ctx
    canvas = helperCanvas || canvas
    ctx.font = canvas.style.font = this.getFont(fontParams)
    let metrics = ctx.measureText(text)
    let underLineHeight = 0
    if(fontParams.underline){
      underLineHeight = Math.max(1.5, Math.round(fontParams.fontSize * ratio / 16))
    }
    return {
      x: 0,
      y: metrics.leading || 0,
      w: Math.ceil(metrics.width),
      h: metrics.leading,
      underLineHeight: underLineHeight,
      textH: Math.ceil(1 + metrics.bounds.maxy - metrics.bounds.miny)
    }

  }
  /**
   * 根据样式类型绘制
   */
  EP.drawAlignment = function(element,axisY,newHeight){
    let { ctx,helperCtx, props } = this
    ctx = helperCtx || ctx
    ctx.textAlign = 'start'
    ctx.textBaseline = 'middle'
    let valueWidth = 0
    let labelAxisX = 0
    let valueAxisX = 0
    let unitAxisX = 0
    let textRectLabel = this.getFontHeight(element.key,props.labelFont)
    let textRect = this.getFontHeight(element.value,props.valueFont)
    let textRectUnit = this.getFontHeight(element.unit,props.unitFont)
    let {clearX,clearY,clearW,clearH} = 0
    let clear = false
    //计算文本绘制的居中方式
    switch (+props.alignment) {
      case 1:
        //样式一
        labelAxisX = Math.floor(ctx.width*0.45 - textRectLabel.w)
        valueAxisX = Math.floor(ctx.width*0.46)
        unitAxisX = Math.floor(ctx.width * 0.82)
        if(unitAxisX < valueAxisX + textRect.w){
          clearX = unitAxisX
          clearY = axisY - newHeight/2
          clearW = valueAxisX + textRect.w - unitAxisX
          clearH = newHeight
          clear = true
        }
        break
      case 2:
        //样式二
        labelAxisX = ctx.width / 2 - textRectLabel.w
        valueAxisX = Math.floor(ctx.width*0.51)
        //绘制单位
        unitAxisX = valueAxisX + textRect.w
        break
      case 3:
        //样式三
        labelAxisX = ctx.width / 2 - textRectLabel.w
        valueWidth =textRect.w + textRectUnit.w
        valueAxisX = Math.floor(ctx.width * 0.755 - valueWidth/2)
        unitAxisX = valueAxisX + textRect.w
        if(valueAxisX < Math.ceil(ctx.width*0.51)){
          clearX = valueAxisX
          clearY = axisY - newHeight/2
          clearW = Math.ceil(ctx.width*0.51) - valueAxisX
          clearH = newHeight
          clear = true
        }
        break
    }
    let unitNewHeight = textRectUnit.h
    let valueNewHeight = textRect.h
    let labelNewHeight = textRectLabel.h
    //重写testRect，为了兼容某些字体下，相同字号的中英文下划线位置不一致的问题
    if(props.labelFont.fontSize === props.valueFont.fontSize){
      valueNewHeight = labelNewHeight
    }
    if(props.labelFont.fontSize === props.unitFont.fontSize){
      unitNewHeight = labelNewHeight
    }
    if(props.valueFont.fontSize === props.unitFont.fontSize){
      valueNewHeight = unitNewHeight
    }
    this.drawUnitFont(element,unitAxisX,axisY,textRectUnit,unitNewHeight)
    if(clear && +props.alignment === 1){
      ctx.clearRect(clearX,clearY,clearW,clearH)
    }
    this.drawValueFont(element,valueAxisX,axisY,textRect,valueNewHeight)
    if(clear && +props.alignment === 3){
      ctx.clearRect(clearX,clearY,clearW,clearH)
    }
    this.drawLabelFont(element,labelAxisX,axisY,textRectLabel,labelNewHeight)

  }
  /**
   * 绘制标签
   */
  EP.drawLabelFont = function(element,x,y,textRect,newHeight){
    let { ctx,helperCtx,props } = this
    ctx = helperCtx || ctx
    ctx.font = this.getFont(props.labelFont)
    ctx.fillStyle = props.labelFont.color
    ctx.fillText(element.key,x, y)
    if(props.labelFont.underline){
      ctx.fillRect(x, y+ newHeight/2- textRect.underLineHeight-2, textRect.w, textRect.underLineHeight)
    }
  }
  /**
   * 绘制值
   */
  EP.drawValueFont = function(element,x,y,textRect,newHeight){
    let { ctx,helperCtx,props } = this
    ctx = helperCtx || ctx
    ctx.font = this.getFont(props.valueFont)
    ctx.fillStyle = props.valueFont.color
    ctx.fillText(element.value,x, y)
    if(props.valueFont.underline){
      ctx.fillRect(x, y+ newHeight/2- textRect.underLineHeight-2, textRect.w, textRect.underLineHeight)
    }
  }
  /**
   * 绘制单位
   */
  EP.drawUnitFont = function(element,x,y,textRect,newHeight){
    let { ctx,helperCtx, props } = this
    ctx = helperCtx || ctx
    ctx.font = this.getFont(props.unitFont)
    ctx.fillStyle = props.unitFont.color
    ctx.fillText(element.unit,x, y)
    if(props.unitFont.underline && element.unit){
      ctx.fillRect(x, y+ newHeight/2- textRect.underLineHeight-2, textRect.w, textRect.underLineHeight)
    }
  }
  /**
   *  获取文本
   */
  EP.getText = function () {
    const { props } = this
    const { customLabel } = props
    let textLabels = []
    //添加标签文本
    Object.keys(customLabel).forEach((element) => {
      let isOpen = props[element] || false
      if (isOpen) { //&& ctx.height > this.h * textLabels.length
        textLabels.push({
          key: customLabel[element],
          value: '--',
          unit: props[`${element}Unit`] || ''
        })
      }
    })
    return textLabels
  }
  /**
   * 获取字体样式
   */
  EP.getFont = function(fontProps){
    const { props }  = this
    const scale = (props.scale || 1)
    const ratio = this.ratio * scale
    let fontSize = fontProps.fontSize * ratio
    const fonts = []
    //粗体
    if (fontProps.bold) {
      fonts.push('bold')
    }
    //斜体
    if (fontProps.italic) {
      fonts.push('italic')
    }
    fonts.push(fontSize + 'px')
    fonts.push(fontProps.fontFamily)
    return fonts.join(' ')
  }
  /**
   * 设置canvas宽高
   */
  EP.setSize = function (width, height, originWidth, originHeight) {
    const { canvas } = this
    canvas.width = width
    canvas.height = height
    canvas.style.cssText += `width:${Math.ceil(originWidth)}px;height:${Math.ceil(originHeight)}px;`
  }
  /**
   * 销毁
   */
  EP.destroy = function () {
    this.timer && clearInterval(this.timer)
    try {
      this.canvas && this.canvas.parentNode.removeChild(this.canvas)
      this.helperCanvas && this.helperCanvas.parentNode.removeChild(this.helperCanvas)
    } catch (error) {
      //
    }
  }
  /**
   * 预览
   */
  EP.preview = function(options,cb){
    this.helperCtx = null
    this.helperCanvas = null
    switch(+options.playMode){
      case 0:
        this.previewScroll(options)
        break
      case 1:
        //翻页
        this.previewPage(options,cb)
        break
      case 2:
        //静止
        this.render(options)
        break
    }
  }
  /**
   * 预览滚动
   */
  EP.previewScroll = function(options){
    this.props = options || {}
    const { ctx,props } = this
    const scale = props.scale || 1
    const ratio = scale * this.ratio
    const w = props.width * ratio
    const h = props.height * ratio
    ctx.width = w
    ctx.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.imageSmoothingQuality = 'high'
    ctx.save()
    this.setSize(w, h, props.width * scale, props.height * scale)
    // 每帧移动距离
    this.movingPixelsPerFrame = 0
    // 单帧刷新时间
    this.frameRefreshTime = 0
    // 按档位
    if (props.speedType === 1) {
      const data = GEAR_POSITION_PIXELS_MAP[props.speedGear]
      this.frameRefreshTime = REFRESH_CYCLE[data[0]]
      this.movingPixelsPerFrame = data[1]
    } else {
      this.frameRefreshTime = REFRESH_CYCLE[0]
      this.movingPixelsPerFrame = props.speedPixel / 1000 * FRAME_TIME
    }
    this.scrollRun()


  }
  EP.scrollRun = function(){
    const { ctx,props } = this
    //绘制
    this.textLabels = this.getText()
    //无内容
    if(!this.textLabels.length){
      return
    }
    const params = this.getDrawParams()

    const txtHeight = this.textLabels.length * params.lineHeight
    const boxHeight = ctx.height
    let moveY = boxHeight
    const duration = props.duration * 1000
    const velocity = this.movingPixelsPerFrame / FRAME_TIME
    const usedTimePerFragment = txtHeight / velocity
    const countFragmentInCanvas = Math.ceil(boxHeight / txtHeight)
    const scale = props.scale || 1
    const ratio = scale * this.ratio
    const w = props.width * ratio
    const h = props.height * ratio
    let currentTime = 0
    this.helperCanvas = document.createElement('canvas')
    this.helperCtx = this.helperCanvas.getContext('2d')
    this.helperCanvas.width = props.width
    this.helperCanvas.height = txtHeight + params.startY
    this.helperCtx.width = props.width
    this.helperCtx.height = txtHeight + params.startY
    this.helperCanvas.style.cssText += `width:${Math.ceil(props.width)}px;height:${Math.ceil(txtHeight + params.startY)}px;visibility:hidden;`
    document.body.appendChild(this.helperCanvas)
    this.draw({
      textLabels: this.textLabels,
      startY: params.startY,
      lineHeight: params.lineHeight
    })
    const imageData = this.helperCtx.getImageData(0, 0, props.width, txtHeight + params.startY)

    // // console.time('起点')

    const getY = (index) => (moveY + txtHeight * index)
    const draw = index => {
      const y = getY(index)
      if (index >= 0 ) {
        ctx.putImageData(imageData, 0, y)
      }
    }
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(() => {
      ctx.clearRect(0, 0, w, h)
      if (currentTime >= duration) {
        clearInterval(this.timer)
        //console.timeEnd('起点')
      }
      else {
        const currentFragment = (currentTime / usedTimePerFragment) | 0
        // 之前依然在画布上可见的
        if (currentFragment > 0) {
          let count = countFragmentInCanvas
          while (count) {
            const index = currentFragment - count
            // 只画可视范围内的
            if (index >= 0) {
              draw(index)
            }
            count--
          }
        }
        // 即将进入画布的
        draw(currentFragment)

        moveY -= this.movingPixelsPerFrame

        currentTime += this.frameRefreshTime * FRAME_TIME
      }
    }, this.frameRefreshTime * FRAME_TIME)
  }
  /**
   * 预览翻页
   */
  EP.previewPage = function(options){
    const self = this
    this.props = options || {}
    const { ctx,canvas,props } = this
    const scale = props.scale || 1
    const ratio = scale * this.ratio
    const w = props.width * ratio
    const h = props.height * ratio
    ctx.width = w
    ctx.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.imageSmoothingQuality = 'high'
    ctx.save()
    this.setSize(w, h, props.width * scale, props.height * scale)
    //绘制
    this.textLabels = this.getText()
    //无内容
    if(!this.textLabels.length){
      return
    }
    const params = this.getDrawParams()
    let textLabels = this.textLabels.slice(0,params.lines)
    this.draw({
      textLabels,
      startY: params.startY,
      lineHeight: params.lineHeight
    })
    let index = 1
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(()=>{
      textLabels = self.textLabels.slice(params.lines*index,params.lines*(index+1))
      if(!textLabels.length){
        index = 0
        textLabels = self.textLabels.slice(0,params.lines)
      }
      ctx.clearRect(0, 0, w, h)

      self.draw({
        textLabels,
        startY: params.startY,
        lineHeight: params.lineHeight
      })
      index ++
    },+options.pageDuration*1000)
  }
  global.EnvironmentMonitor = environmentMonitor
})(window)
