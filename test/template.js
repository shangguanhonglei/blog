/*
 * @Description: 
 * @Author: tianleilei1
 * @Date: 2021-07-02 15:37:17
 * @LastEditTime: 2021-07-02 15:51:30
 * @LastEditors: tianleilei1
 */
(function(){
  // 变量规则
  var VARIABLE_REG = /<%=([\s\S]+?)%>/g
  // 语法规则
  var SYNTAX_REG = /<%([\s\S]+?)%>/g
  var template = (tpl, data) => {
    // 不包含变量的话直接返回tpl
    if (!tpl || !~tpl.indexOf('<%')) {
      return tpl
    }
  
    let source = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
      tpl.replace(/\\/g, '\\\\')
        .replace(/'/g, '\\\'')
        .replace(VARIABLE_REG, (m, code) => {
          return '\',' + code.replace(/\\'/, '\'') + ',\''
        })
        .replace(SYNTAX_REG, (m, code) => {
          return '\');' + code.replace(/\\'/, '\'')
            .replace(/[\r\n\t]/g, ' ') + '__p.push(\''
        })
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t') +
      '\');}return __p.join("");'
  
    try {
      let render = new Function('obj', source)
      return render.call(null, data || Object.create(null))
    } catch (error) {
      // todo
      return tpl
    }
  }
  window.template = template
})()