import Vue from 'vue'
import Vant from 'vant'
import Cookies from 'js-cookie'
import './registerServiceWorker'
import 'vant/lib/index.css';
import 'highlight.js/styles/solarized-light.css'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/main.scss'
let fundebug = require('fundebug-javascript')
let VConsole = require('vconsole')
fundebug.apikey = '8c8147a1846a6efc110b2ba3d86d41c60e2be94ed4a899eaa81542d30d790501'

import App from './App.vue'
import router from './route'
import store from './vuex'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.Cookies = Cookies

let vConsole = new VConsole();
console.log('Hello world');

function formatComponentName (vm: any) {
  if (vm.$root === vm) return 'root';
  const name = vm._isVue
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

Vue.config.errorHandler = (err: any, vm: any, info: any) => {
  if (vm) {
      const componentName = formatComponentName(vm);
      const propsData = vm.$options && vm.$options.propsData;
      fundebug.notifyError(err, {
          metaData: {
              componentName,
              propsData,
              info
          }
      });
  } else {
      fundebug.notifyError(err);
  }
};

if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', () => {
    if (
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA'
    ) {
      window.setTimeout(() => {
        if ('scrollIntoView' in document.activeElement) {
          console.log('scrollIntoView')
          document.activeElement.scrollIntoView()
        } else {
          console.log('scrollIntoViewIfNeeded')
          document.activeElement.scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  })
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
