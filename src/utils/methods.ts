/**
 * params {function} fun
 * params {number} number
 */
export const debounce = (fun: any, ctx: any, wait = 100) => {
  // 防抖
  let time: any = null
  const rtn = (...params: any[]) => {
    clearTimeout(time) // 清除上一次定时器
    time = setTimeout(() => {
      fun.apply(ctx, params)
    }, wait)
  }
  return rtn
}
