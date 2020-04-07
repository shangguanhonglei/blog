/*
 * @Author: tianll 
 * @Date: 2019-09-25 16:12:45 
 * @Last Modified by: tianll
 * @Last Modified time: 2019-09-25 17:20:59
 */
const TOSTRING = Object.prototype.toString
const PRIMITIVE_VALUES = ['string', 'number', 'boolean', 'symbol', 'undefined']
const NUMBER_REG = /^-?\d*\.?\d+$/
const HASOWN = Object.prototype.hasOwnProperty
const SLICE = Array.prototype.slice
/**
 * 检测是否是字符串
 * @param {*} value 
 */
export const isString = (value) => typeof value === 'string'

/**
 * 校验传入值是否是对象
 * @param {*} value 
 * @returns {Boolean} 
 */
export const isObject = value => value !== null && typeof value === 'object'

/**
 * 校验传入值是否是纯对象
 * @param {*} value 
 * @example
 * isPlainObject({}) // true
 * isPlainObject(null) // false
 * isPlainObject([]) // false
 * @returns {Boolean} 
 */
export const isPlainObject = value => isObject(value) && TOSTRING.call(value) === '[object Object]'
/**
 * 校验传入值是否是数组
 * @returns {Boolean}
 */
export const isArray = Array.isArray
/**
 * 校验传入值是否是函数
 * @param {*} value 
 * @returns {Boolean}
 */
export const isFunction = value => typeof value === 'function'
/**
 * 校验传入值是否是基本类型值
 * @param {*} value 
 * @returns {Boolean}
 */
export const isPrimitive = value => !!~PRIMITIVE_VALUES.indexOf(typeof value)
/**
 * 校验传入值是否是布尔类型
 * @param {*} value 
 * @returns {Boolean}
 */
export const isBoolean = value => typeof value === 'boolean'
/**
 * 校验传入值是否是数字
 * @param {*} value 
 * @returns {Boolean}
 */
export const isNumber = value => !isNaN(value) && typeof value === 'number'
/**
 * 校验传入值是否是数字字符串
 * @param {*} value
 * @returns {Boolean} 
 */
export const isNumberString = value => NUMBER_REG.test(value)
/**
 * 校验传入值是否是整数
 * @param {*} value 
 * @returns {Boolean}
 */
export const isInteger = value => isNumber(value) && (value % 1 === 0)
/**
 * 校验传入值是否是浮点数
 * @param {*} value 
 * @returns {Boolean}
 */
export const isFloat = value => isNumber(value) && value !== (value | 0)
/**
 * 校验传入值是否是一个DOM元素
 * @param {*} value 
 * @returns {Boolean}
 */
export const isElement = value => !!(value && value.nodeType === 1)
/**
 * 校验传入值是否是一个日期对象
 * @param {*} value 
 * @returns {Boolean}
 */
export const isDate = value => TOSTRING.call(value) === '[object Date]'
/**
 * 校验传入值是否为空
 * @param {*} value 
 * @example
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty('  ') // true
 * isEmpty(false) // false
 * isEmpty(0) // false
 * @returns {Boolean}
 */
export const isEmpty = value => {
  if (value === null || value === void 0) {
    return true
  }
  if (isString(value) && !value.trim()) {
    return true
  }
  return false
}
/**
 * 判断对象自身是否含有指定的key,仅能判断对象第一级的属性
 * @param {*} key 
 * @param {*} object 
 * @returns {Boolean}
 */
export const hasKey = (key, object) => HASOWN.call(object, key)
/**
 * 将类数组转换为数组
 * @param {*} arrayLike
 * @returns {Array} 
 */
export const toArray = arrayLike => SLICE.call(arrayLike)
/**
 * 对象混合
 * arg1 :
 *  Boolean: 是否深拷贝
 *  Object: targe
 * arg2, arg2, ..., argn: source
 * @returns {Object}
 */
export function mixins() {
  let target = arguments[0] || {}
  let i = 0
  let deep = false
  let len = arguments.length
  if (isBoolean(target)) {
    deep = target
    target = arguments[1] || {}
    i = 1
  }
  if (!isObject(target) && !isFunction(target)) {
    target = {}
  }
  while (i++ < len) {
    let source = arguments[i]
    if (source) {
      for (let k in source) {
        let src = target[k]
        let copy = source[k]
        // 防止引用自身，造成死循环
        if (copy === target) {
          continue
        }
        let _isArray = isArray(copy)
        if (deep && (_isArray || isPlainObject(copy))) {
          let clone
          if (_isArray) {
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[k] = mixins(deep, clone, copy)
        } else if (copy !== void 0) {
          target[k] = copy
        }
      }
    }
  }

  return target
}
/**
 * 纯对象克隆
 * @param {*} object
 * @returns {Object} 
 */
export const objectClone = object => JSON.parse(JSON.stringify(object))
/**
 * 根据路径从一个对象中获取其值
 * 内置了容错机制，防止层级太深时报错
 * @param {*} path 
 * @param {*} object 
 * @example
 * getObjectValue(p1.p1, obj) // obj.p1.p2
 * @returns {*}
 */
export const getObjectValue = (path, object) => {
  if (isEmpty(path)) {
    return void 0
  }
  let paths = path.trim().split('.')
  while (paths.length) {
    let k = paths.shift()
    object = object[k]
    if (!isPlainObject(object) && !isArray(object)) {
      break
    }
  }
  return object
}
let uid = 0

/**
 * 获取当前不刷新系统中的唯一值uuid
 * gen uuid
 * @returns {Number}
 */
export const uuid = () => ++uid
/**
 * 比较两个JSON
 * @param {*} v1 
 * @param {*} v2 
 */
export const compareJson = (v1, v2) => v1 && v2 && JSON.stringify(v1) === JSON.stringify(v2)
/**
 * html转实体
 * 用于解决xss入侵
 * @param {*} html 
 */
export const encodeHtml = html => {
  if (!html) return html
  return html.replace(/[<>&"]/g, function (char) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    }[char]
  })
}
