export const loginRouter: object = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录',
        login: false
    },
    component: () => import('@/views/Login.vue')
}
export const registerRouter: object = {
    path: '/register',
    name: 'register',
    meta: {
        title: '注册',
        login: false
    },
    component: () => import('@/views/Register.vue')
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
    redirect: '/pages',
    meta: {
        login: false
    },
    component: () => import('@/views/Home.vue'),
    children: [
        {
            path: '/pages',
            name: 'pages',
            component: { template: '<router-view></router-view>' },
            redirect: '/pages/list',
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
                    
                },
                {
                    name: 'draft',
                    path: 'draft',
                    component: () => import('@/views/Page/Draft.vue'),
                    meta: {
                        title: '草稿箱',
                        rewrite_navbar: true
                    }
                },
                {
                    name: 'myList',
                    path: 'mylist',
                    component: () => import('@/views/Page/myList.vue'),
                    meta: {
                        title: '我的文章',
                        rewrite_navbar: true
                    }
                },
            ]
        },
        {
            name: 'tags',
            path: '/tags',
            component: { template: '<router-view></router-view>' },
            redirect: '/tags/list',
            meta: {
                login: false,
                title: '标签',
                icon: 'records',
                tab_active: 1,
                search: true
            },
            children: [
                {
                    name: 'tagList',
                    path: 'list',
                    component: () => import('@/views/Tag/List.vue'),
                    meta: {
                        login: false,
                        tab_active: 1,
                        search: true
                    }
                },
                {
                    name: 'tagDetail',
                    path: 'detail/:name',
                    component: () => import('@/views/Tag/Detail.vue'),
                    meta: {
                        login: false,
                        tab_active: 1,
                        search: false
                    }
                }
            ]
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
                title: '个人中心',
                icon: 'contact',
                tab_active: 3,
                search: false,
                rewrite_navbar: true
            }
        },
        {
            name: 'user',
            path: '/user/:username',
            component: () => import('@/views/User/index.vue'),
            meta: {
                login: false,
                title: '个人中心',
                search: false,
                hide_header: true
            }
        }

    ]

}
export const routers: Array<object> = [ 
    loginRouter,
    registerRouter,
    page404,
    normalRouter
]