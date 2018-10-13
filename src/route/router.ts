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
    redirect: '/page',
    meta: {
        login: false
    },
    component: () => import('@/views/Home.vue'),
    children: [
        {
            path: '/page',
            component: { template: '<router-view></router-view>' },
            redirect: '/page/list',
            meta: {
                login: false,
                title: '首页',
                icon: 'wap-home',
                tab_active: 0,
                search: true
            },
            children: [
                {
                    name: 'pageList',
                    path: 'list',
                    component: () => import('@/views/Page/List.vue'),
                    meta: {
                        search: true,
                        tab_active: 0
                    }
                },
                {
                    name: 'pageDetail',
                    path: 'detail/:id',
                    component: () => import('@/views/Page/Detail.vue'),
                    meta: {
                        search: false
                    }
                },
                {
                    name: 'pageSeach',
                    path: 'search',
                    component: () => import('@/views/Page/Search.vue'),
                    meta: {

                    }
                    
                }
            ]
        },
        {
            name: 'tags',
            path: '/tags',
            component: () => import('@/views/Tags.vue'),
            meta: {
                login: false,
                title: '标签',
                icon: 'records',
                tab_active: 1,
                search: true
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
                tab_active: 2,
                search: true
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
                tab_active: 3,
                search: true
            }
        },

    ]

}
export const routers: Array<object> = [ 
    loginRouter,
    page404,
    normalRouter
]