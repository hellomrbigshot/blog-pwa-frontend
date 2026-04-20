/**
 * 防抖函数 - 适用于连续触发场景（如搜索输入、窗口 resize）
 * @param fun 需要防抖的函数
 * @param ctx 函数执行的上下文
 * @param wait 等待时间（毫秒）
 */
export const debounce = <T extends (...args: any[]) => any>(fun: T, ctx: any, wait = 100) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  
  return function(this: any, ...params: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(ctx, params)
    }, wait)
  }
}

/**
 * 节流函数 - 适用于频繁触发场景（如滚动、鼠标移动）
 * @param fun 需要节流的函数
 * @param ctx 函数执行的上下文
 * @param wait 间隔时间（毫秒）
 */
export const throttle = <T extends (...args: any[]) => any>(fun: T, ctx: any, wait = 100) => {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  
  return function(this: any, ...params: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - lastTime)
    
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fun.apply(ctx, params)
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fun.apply(ctx, params)
      }, remaining)
    }
  }
}

/**
 * 深度克隆对象
 * @param obj 需要克隆的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any
  }
  
  const clonedObj = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }
  return clonedObj
}

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
 */
export const formatDate = (date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 本地存储工具类
 */
export const storage = {
  set(key: string, value: any, expire?: number): void {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null
    }
    localStorage.setItem(key, JSON.stringify(data))
  },
  
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null
    
    try {
      const data = JSON.parse(item)
      if (data.expire && Date.now() > data.expire) {
        localStorage.removeItem(key)
        return null
      }
      return data.value
    } catch {
      return null
    }
  },
  
  remove(key: string): void {
    localStorage.removeItem(key)
  },
  
  clear(): void {
    localStorage.clear()
  }
}
