import Vue from 'vue'
import Vant from 'vant'
import Cookies from 'js-cookie'
import './registerServiceWorker'
import 'vant/lib/index.css';
import 'highlight.js/styles/solarized-light.css'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/main.scss'
let fundebug = require('fundebug-javascript')
fundebug.apikey = '8c8147a1846a6efc110b2ba3d86d41c60e2be94ed4a899eaa81542d30d790501'

import App from './App.vue'
import router from './route'
import store from './vuex'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.Cookies = Cookies

function formatComponentName (vm: any) {
  if (vm.$root === vm) return 'root';
  var name = vm._isVue
      ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
      : vm.name;
  return (
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file
          ? ' at ' + (vm.$options && vm.$options.__file)
          : '')
  );
}

Vue.config.errorHandler = function (err, vm, info) {
  if (vm) {
      var componentName = formatComponentName(vm);
      var propsData = vm.$options && vm.$options.propsData;
      fundebug.notifyError(err, {
          metaData: {
              componentName: componentName,
              propsData: propsData,
              info: info
          }
      });
  } else {
      fundebug.notifyError(err);
  }
};


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
