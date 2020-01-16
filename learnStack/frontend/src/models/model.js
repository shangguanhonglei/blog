import Vue from 'vue'
import Qs from 'qs'
const URL_REG = /\/Rest\//i
const RES_SUCCESS_CODE_REG = /^1\d{7,}$/
export class Model  {
  /**
   * 具体的借口交口细节
   * @param {*} url 
   * @param {*} options 
   */
  static Request(url,options){
    return new Promise((resolve, reject)=>{
      const $axios = Vue.axios
      url = '/Rest/' + (url || '').replace(URL_REG, '')
      options = options || Object.create(null)
      options.url = url
      $axios(options).then((response)=>{
        if(response.status === 200 && response.data.status) {
          const { data } = response
          const status = data.status[0] || data.status
          const res = Object.create(null)
          res.code = status
          res.status = RES_SUCCESS_CODE_REG.test(status + '')
          res.data = data.data
          res.origin = data
          response.body = res
        }
        resolve(response)
        
      }).catch((e)=>reject(e))
    })
  }
  static Get(url,params){
    return this.Request(url,{
      method: 'get',
      params,
       // `paramsSerializer` 是一个负责 `params` 序列化的函数
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      paramsSerializer(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets',encode: true})
      }
    })
  }
  static Post(url,data,params,options = {}) {
    return this.Request(url,{
      method: 'post',
      params,
      data,
      ...options
    })
  }
  static Put(url,data,params) {
    return this.Request(url,{
      method: 'put',
      params,
      data
    })
  }
  static Delete(url,data,params){
    return this.Request(url,{
      method: 'delete',
      params,
      data
    })
  }
}
export default Model