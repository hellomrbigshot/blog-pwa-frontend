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
                icon: 'wap-home',
                tab_active: 0
            }
        },
        {
            name: 'tags',
            path: '/tags',
            component: () => import('@/views/Tags.vue'),
            meta: {
                login: false,
                title: '标签',
                icon: 'records',
                tab_active: 1
            }
        },
        {
            name: 'comments',
            path: '/comments',
            component: () => import('@/views/Comments.vue'),
            meta: {
                login: true,
                title: '消息',
                icon: 'chat',
                tab_active: 2
            }
        },
        {
            name: 'mine',
            path: '/mine',
            component: () => import('@/views/Mine.vue'),
            meta: {
                login: false,
                title: '消息',
                icon: 'contact',
                tab_active: 3
            }
        },

    ]

}
export const routers: Array<object> = [ 
    loginRouter,
    page404,
    normalRouter
]