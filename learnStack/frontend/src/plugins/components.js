import Vue from 'vue'
//import Uploader from '@/components/logic/uploader'
const Components = [
  //Uploader
]
const componentsPlugin = Object.create(null)
componentsPlugin.install = function(Vue){
  Components.forEach((component)=>{
    Vue.component(component.name, component)
  })
}
Vue.use(componentsPlugin)
export default componentsPlugin
