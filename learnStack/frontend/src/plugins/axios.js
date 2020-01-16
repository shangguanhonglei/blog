import Vue from 'vue'
import axios from 'axios'
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  headers: {}
}
const _axios = axios.create(config)
// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
const axiosPlugin = Object.create(null)
axiosPlugin.install = function(Vue){
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype,{
    axios: {
      get(){
        return _axios
      }
    },
    $axios: {
      get(){
        return _axios
      }
    }
  })
}
Vue.use(axiosPlugin)
export default axiosPlugin
