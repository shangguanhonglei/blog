import C from '../config'
import Cookies from 'js-cookie'
import Store from './store'
/**
 * 获取多语言
 */
export const getLang = ()=>{
  return Cookies.get(C.LANGKEY) || Store(C.LANGKEY) || window.navigator.language || 'zh-CN'
}
/**
 * 设置多语言
 * @param {*} lang 
 */
export const setLang = (lang)=>{
  if(!lang){
    return
  }
  if(!C.LANGLIST.includes(lang)){
    return
  }
  var params = Object.create(null)
  params.expires = 365
  params.path = '/'
  params.domain = '.hanqing.site'
  Cookies.set(C.LANGKEY,lang,params)
  Store(C.LANGKEY,lang)
}
export default {
  getLang,
  setLang
}