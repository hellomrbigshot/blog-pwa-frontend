export const loginRouter: object = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    login: false,
    keepAlive: false
  },
  component: () => import('@/views/Login.vue')
}
export const registerRouter: object = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册',
    login: false,
    keepAlive: false
  },
  component: () => import('@/views/Register.vue')
}
export const skeleton: object = {
  path: '/skeleton',
  name: 'skeleton',
  meta: {
    title: '骨架屏',
    login: false,
    keepAlive: true
  },
  component: () => import('@/Skeleton.vue')
}
export const page404 = {
  path: '*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
    login: false,
    keepAlive: true
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
        search: true,
        keepAlive: true
      },
      children: [
        {
          name: 'pageListPage',
          path: 'list',
          component: () => import('@/views/Page/List.vue'),
          meta: {
            search: true,
            tab_active: 0,
            keepAlive: true
          }
        },
        {
          name: 'pageDetail',
          path: 'detail/:id',
          component: () => import('@/views/Page/Detail.vue'),
          meta: {
            search: false,
            keepAlive: false
          }
        },
        {
          name: 'pageSeach',
          path: 'search',
          component: () => import('@/views/Page/Search.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          name: 'draft',
          path: 'draft',
          component: () => import('@/views/Page/Draft.vue'),
          meta: {
            title: '草稿箱',
            rewrite_navbar: true,
            keepAlive: true
          }
        },
        {
          name: 'myList',
          path: 'mylist',
          component: () => import('@/views/Page/myList.vue'),
          meta: {
            title: '我的文章',
            rewrite_navbar: true,
            keepAlive: true
          }
        }
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
            search: true,
            keepAlive: true
          }
        },
        {
          name: 'tagDetail',
          path: 'detail/:name',
          component: () => import('@/views/Tag/Detail.vue'),
          meta: {
            login: false,
            tab_active: 1,
            search: false,
            keepAlive: true
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
        search: true,
        keepAlive: true
      }
    },
    {
      name: 'mine',
      path: '/mine',
      component: () => import('@/views/Mine.vue'),
      meta: {
        login: false,
        title: '我',
        icon: 'contact',
        tab_active: 3,
        search: false,
        rewrite_navbar: true,
        keepAlive: true
      }
    },
    {
      name: 'user',
      component: { template: '<router-view></router-view>' },
      path: '/user',
      redirect: '/user/info',
      children: [
        {
          name: 'userInfo',
          path: '/info/:username',
          component: () => import('@/views/User/Info.vue'),
          meta: {
            login: false,
            title: '个人中心',
            search: false,
            hide_header: true,
            keepAlive: true
          }
        },
        {
          name: 'userSetting',
          path: '/setting/:username',
          component: () => import('@/views/User/Setting.vue'),
          meta: {
            login: true,
            title: '个人设置',
            search: false,
            hide_header: false,
            rewrite_navbar: true,
            keepAlive: false
          }
        }
      ]
    }
  ]
}
export const routers: object[] = [
  loginRouter,
  skeleton,
  registerRouter,
  page404,
  normalRouter
]
