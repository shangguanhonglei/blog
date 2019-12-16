/*
 * @Author: tianll 
 * @Date: 2019-10-08 20:31:45 
 * @Last Modified by:   tianll 
 * @Last Modified time: 2019-10-08 20:31:45 
 */
// 变量规则
const VARIABLE_REG = /<%=([\s\S]+?)%>/g
// 语法规则
const SYNTAX_REG = /<%([\s\S]+?)%>/g

/**
 * 编译模板
 * @param {*} tpl 
 * @param {*} data
 * @example
 * <% if(something) {%>
 * <div><%= something%></div>
 * <% }%> 
 * @returns {String}
 */
export const template = (tpl, data) => {
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

export default template