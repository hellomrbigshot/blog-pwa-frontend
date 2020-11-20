import marked from 'marked'
import hljs from '../libs/hljs'
import { Component, Vue } from 'vue-property-decorator'
declare module 'vue/types/vue' {
  interface Vue {
    Cookies: {
      get: (params: string) => string,
      set: (params: string, str: string, option?: { expires: number }) => void,
      remove: (params: string) => void
    }
    computed: object
    $bus: Vue
    formatTime(time: any, type: string): void
    marked(content: string): void
    debounce (fun: (...a: any[]) => void, wait: number): () => void
    throttle (fun: (...a: any[]) => void, wait: number): () => void
  }
}
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: 'vue-express',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
// 不足 10 自动补 0
function format (num: number = 0) {
  const result: string = num < 10 ? `0${num}` : `${num}`
  return result
}
function type3 (t: any) {
  let nowTime = new Date().getTime()
  let time = new Date(t).getTime()
  if (nowTime - time < 60 * 1000) {
    // return  `${Math.floor((nowTime-time)/(1000))} 秒前`
    return `刚刚`
  } else if (nowTime - time < 60 * 60 * 1000) {
    return `${Math.floor((nowTime - time) / (60 * 1000))} 分钟前`
  } else if (nowTime - time < 24 * 60 * 60 * 1000) {
    return `${Math.floor((nowTime - time) / (60 * 60 * 1000))} 小时前`
  } else if (nowTime - time < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor((nowTime - time) / (24 * 60 * 60 * 1000))} 天前`
  } else if (new Date().getFullYear() === new Date(t).getFullYear()) {
    return `${format(new Date(t).getMonth() + 1)}月${format(new Date(t).getDate())}日`
  } else {
    return `${new Date(t).getFullYear()}-${format(
      new Date(t).getMonth() + 1
    )}-${format(new Date(t).getDate())}`
  }
}
@Component
export default class mixin extends Vue {
  /**
   * params {string} time
   * params {string} type
   */
  formatTime(time: Date, type: string = '1') {
    let str: string = ''
    switch (type) {
      // yyyy-mm-dd hh:MM:ss
      case '1':
        time = new Date(time)
        str = `${time.getFullYear()}-${format(time.getMonth() + 1)}-${format(
          time.getDate()
        )} ${format(time.getHours())}:${format(time.getMinutes())}:${format(
          time.getSeconds()
        )}`
        break
      // yyyy-mm-dd
      case '2':
        let date: any = new Date(time)
        str = `${time.getFullYear()}-${format(time.getMonth() + 1)}-${format(
          time.getDate()
        )}`
        break
      // 倒计时
      case '3':
        str = type3(time)
        break
      default:
        break
    }
    return str
  }
  /**
   * params {string} content
   */
  marked(content: string) {
    if (!content || !content.trim()) return ''
    return marked(content)
  }
  /**
   * params {function} fun
   * params {number} number
   */
  debounce(fun: (...a: any[]) => unknown, wait: number = 100) {
    // 防抖
    let time: number | undefined
    const rtn = (...args: any[]) => {
      clearTimeout(time) // 清除上一次定时器
      time = window.setTimeout(() => {
        fun.apply(this, args)
      }, wait)
    }
    return rtn
  }
  /**
   * params {function} fun
   * params {number} number
   *
   */
  throttle (fun: (...a: any[]) => unknown, wait: number = 100) {
    let previous = 0
    return (...args: any[]) => {
      const now = +new Date()
      if (now - previous > wait) {
        fun.apply(this, args)
        previous = now
      }
    }
  }
}
