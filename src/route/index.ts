import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import { routers } from './router'
Vue.use(VueRouter)


const RouterConfig: object = {
    mode: 'history',
    routes: routers
}
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    if (!Cookies.get('username') && to.meta.login) {
        router.push({ name: 'login' });
    } else {
        next();
    }   
})

export default router

