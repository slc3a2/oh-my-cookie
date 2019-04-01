import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en-US', 
  messages: {
    'en-US': require('./common/lang/en'),
    'zh-CN': require('./common/lang/zh')
  }
})
new Vue({
  el: '#root',
  i18n,
  render: h => h(root)
})
