import Vue from 'vue'
import Vant from 'vant'
import Cookies from 'js-cookie'
import 'vant/lib/index.css';
import 'highlight.js/styles/solarized-light.css'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/main.scss'

import App from './App.vue'
import router from './route'
import store from './vuex'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.Cookies = Cookies


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
