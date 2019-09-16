import axios from 'axios'
import { Toast } from 'vant'
import Cookies from 'js-cookie'
import router from '@/route/index'


class HttpRequest {
  baseUrl: string
  queue: any
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig(token: string | undefined) {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Beare ${token}`
      }
    }
    return config
  }
  distroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) { }
  }
  interceptors(instance: any, url: string) {
    // 请求拦截
    instance.interceptors.request.use((config: any) => {
      // 添加全局 loading
      if (!Object.keys(this.queue).length) { }
      this.queue[url] = true
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use((res: any) => {
      this.distroy(url)
      const { code, data } = res.data
      if (code === 'ERROR') {
        Toast.fail(data)
        return Promise.reject(data)
      }
      return { code, data }
    }, (error: any) => {
      this.distroy(url)
      if (error.response) {
        switch (error.response.status) {
          case 402:
            Cookies.remove('user')
            localStorage.removeItem('user')
            Cookies.remove('token')
            Cookies.remove('refreshToken')
            router.replace({
              name: 'login',
              query: { redirect: router.currentRoute.fullPath }
            })
            return false
            // break
          // case 402:
          //   Toast.fail('用户已登录')
          //   break
        }
      }
      return Promise.reject(error)
    })
  }
  fetchRefreshToken() {
    const token = Cookies.get('refreshToken')
    return axios({
      url: '/api/signin/refreshToken',
      headers: { Authorization: `Beare ${token}` },
      method: 'get'
    })
  }
  request(options: any): any {
    const instance = axios.create()
    const token = Cookies.get('token')
    options = Object.assign(options, this.getInsideConfig(Cookies.get('token')))
    this.interceptors(instance, options.url)
    return instance(options).then(res => {
      return res
    }).catch(e => {
      if (e.response.status === 401) {
        return this.fetchRefreshToken().then(res => {
          const { data } = res.data
          const { token: Token, refresh_token: refreshToken } = data
          Cookies.set('token', Token)
          Cookies.set('refreshToken', refreshToken)
          return this.request(options) // 重新调用这个接口
        }).catch(error => {
          if (error.response) {
            switch (error.response.status) {
              case 402:
                Cookies.remove('user')
                localStorage.removeItem('user')
                Cookies.remove('token')
                Cookies.remove('refreshToken')
                router.replace({
                  name: 'login',
                  query: { redirect: router.currentRoute.fullPath }
                })
                break
            }
          }
          return Promise.reject(error)
        })
      }
    })
  }
}
export default HttpRequest
