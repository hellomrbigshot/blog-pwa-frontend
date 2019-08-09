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
export const skeleton = {
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
        tabActive: 0,
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
            tabActive: 0,
            keepAlive: true
          }
        },
        {
          name: 'pageDetail',
          path: 'detail/:id/:hash?',
          component: () => import('@/views/Page/Detail.vue'),
          meta: {
            search: false,
            keepAlive: false
          }
        },
        {
          name: 'pageSearch',
          path: 'search',
          component: () => import('@/views/Page/Search.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'pageCreate',
          path: 'create',
          component: () => import('@/views/Page/Create.vue'),
          meta: {
            title: '写文章',
            rewriteNavbar: true,
            keepAlive: true,
            login: true,
            hideHeader: true,
          }
        },
        {
          name: 'draft',
          path: 'draft',
          component: () => import('@/views/Page/Draft.vue'),
          meta: {
            title: '草稿箱',
            rewriteNavbar: true,
            keepAlive: true,
            login: true
          }
        },
        {
          name: 'myList',
          path: 'mylist',
          component: () => import('@/views/Page/myList.vue'),
          meta: {
            title: '我的文章',
            rewriteNavbar: true,
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
        tabActive: 1,
        search: true
      },
      children: [
        {
          name: 'tagList',
          path: 'list',
          component: () => import('@/views/Tag/List.vue'),
          meta: {
            login: false,
            tabActive: 1,
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
            tabActive: 1,
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
        tabActive: 2,
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
        tabActive: 3,
        search: false,
        rewriteNavbar: true,
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
            hideHeader: true,
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
            hideHeader: false,
            rewriteNavbar: true,
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
