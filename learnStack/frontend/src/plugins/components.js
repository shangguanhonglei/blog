import Vue from 'vue'
const Components = [
]
const componentsPlugin = Object.create(null)
componentsPlugin.install = function(Vue){
  Components.forEach((component)=>{
    Vue.component(component.name, component)
  })
}
Vue.use(componentsPlugin)
export default componentsPlugin
