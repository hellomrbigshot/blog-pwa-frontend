export const loginRouter: object = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录',
        login: false
    },
    component: () => import('@/views/Login.vue')
}
export const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        login: false
    },
    component: () => import('@/views/error-page/404.vue')
}
export const normalRouter = {
    path: '/',
    redirect: '/pagelist',
    meta: {
        login: false
    },
    component: () => import('@/views/Home.vue'),
    children: [
        {
            name: 'pageList',
            path: '/pagelist',
            component: () => import('@/views/pageList.vue'),
            meta: {
                login: false,
                title: '首页',
                icon: 'wap-home'
            }
        }
    ]

}
export const routers: Array<object> = [ 
    loginRouter,
    page404,
    normalRouter
]