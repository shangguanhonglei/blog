import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import './plugins/components'
import NovaUI from '@vnnox/novaui/libs/nova-vue'
import NovaUiJaLocale from '@/locales/ja/nova-ui'
import { locale, i18n } from './i18n'
import router from './router'
Vue.config.productionTip = false
import '@vnnox/novaui/libs/nova.css'
Vue.use(NovaUI, {
  lang: locale,
  locales: {
    ja: NovaUiJaLocale
  }
})
new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
