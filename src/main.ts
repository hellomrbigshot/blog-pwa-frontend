import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import 'highlight.js/styles/googlecode.css'
import '@/assets/css/main.scss'
import App from './App.vue'
import router from './route'
import store from './vuex'

Vue.use(Vant)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
