// import 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import '@/plugins/element.js'
import moment from 'moment' //处理时间日期的一个js库
import tab from '@/utils/tab' //文章标题下的标题


moment.locale = ('zh-cn')//使用时区
Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$tab = tab


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
