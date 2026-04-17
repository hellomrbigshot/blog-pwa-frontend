import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'vant'
import Cookies from 'js-cookie'
import router from '@/route/index'
import store from '@/vuex'
import { CHANGE_LOADING_ARR } from '@/vuex/mutation-types'

class HttpRequest {
  baseUrl: string
  queue: Map<string, boolean>
  instance: AxiosInstance

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.queue = new Map()
    // 创建单例 axios 实例，避免每次请求都创建新实例
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000
    })
    this.setupInterceptors()
  }

  getInsideConfig(token: string | undefined): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${token}` // 修复拼写错误：Beare -> Bearer
      }
    }
  }

  destroy(url: string) {
    this.queue.delete(url)
  }

  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use((config: any) => {
      store.commit(CHANGE_LOADING_ARR, { type: 'ADD' })
      this.queue.set(config.url, true)
      
      const token = Cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }, (error) => Promise.reject(error))

    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      store.commit(CHANGE_LOADING_ARR, { type: 'MINUS' })
      this.destroy(res.config.url!)
      
      const { code, data } = res.data
      if (code === 'ERROR') {
        Toast.fail(data)
        return Promise.reject(data)
      }
      return { code, data }
    }, (error) => {
      store.commit(CHANGE_LOADING_ARR, { type: 'MINUS' })
      this.destroy(error.config?.url)
      
      if (error.response) {
        switch (error.response.status) {
          case 402:
            this.handleLogout()
            break
          case 401:
            // 统一在 request 方法中处理 token 刷新
            break
        }
      }
      return Promise.reject(error)
    })
  }

  handleLogout() {
    Cookies.remove('user')
    localStorage.removeItem('user')
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    router.replace({
      name: 'login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }

  async fetchRefreshToken(): Promise<AxiosResponse> {
    const refreshToken = Cookies.get('refreshToken')
    return axios({
      url: '/api/signin/refreshToken',
      headers: { Authorization: `Bearer ${refreshToken}` },
      method: 'get'
    })
  }

  async request(options: AxiosRequestConfig): Promise<any> {
    try {
      const config = { ...options, ...this.getInsideConfig(Cookies.get('token')) }
      return await this.instance(config)
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const res = await this.fetchRefreshToken()
          const { token: Token, refresh_token: refreshToken } = res.data.data
          Cookies.set('token', Token)
          Cookies.set('refreshToken', refreshToken)
          
          // 重试原请求
          const config = { ...options, ...this.getInsideConfig(Token) }
          return await this.instance(config)
        } catch (refreshError) {
          if (refreshError.response?.status === 402) {
            this.handleLogout()
          }
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  }
}

export default HttpRequest
