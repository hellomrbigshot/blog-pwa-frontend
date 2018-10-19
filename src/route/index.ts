import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
Vue.use(VueRouter)


const RouterConfig: object = {
    mode: 'history',
    routes: routers
}
const router = new VueRouter(RouterConfig);

router.afterEach((to, from) => {
    // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // scrollTop = 0;
    
})

export default router

