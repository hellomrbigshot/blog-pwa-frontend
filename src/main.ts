import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
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
