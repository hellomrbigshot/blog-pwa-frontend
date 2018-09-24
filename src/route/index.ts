import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
Vue.use(VueRouter)


const RouterConfig: object = {
    mode: 'history',
    routes: routers
}

export default new VueRouter(RouterConfig)

