import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLang } from '../utils/cache'
export const locale = getLang()
document.documentElement.setAttribute('data-lang',locale)
Vue.use(VueI18n)
/**
 * 获取语言包
 * @param {*} locales 
 */
const loadLocaleMessages = (locales) => {
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}
/**
 * require.context为webpack中获取某文件夹下符合规则的文件
 */
const messages = loadLocaleMessages(require.context('../locales', true, /[A-Za-z0-9-_,\s]+\/index\.js$/i))
// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale, // set locale
  messages, // set locale messages
})

export default {
  locale,
  i18n
}