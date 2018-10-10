import marked from 'marked'
import hljs from 'highlight.js'
import { Component, Vue } from 'vue-property-decorator';
marked.setOptions({ 
    renderer: new marked.Renderer(),
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
    const result: string = num < 10 ? `0${num}` : `${num}`;
    return result;
}
function type3 (t: any) {
    let nowTime = new Date().getTime()
    let time = new Date(t).getTime();
    if (nowTime - time < 60*60*1000) {
        return  `${Math.floor((nowTime-time)/(60*1000))} 分钟前`;
    } else if (nowTime - time < 24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(60*60*1000))} 小时前`;
    } else if (nowTime - time < 7*24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(24*60*60*1000))} 天前`;
    } else if (new Date().getFullYear() === new Date(t).getFullYear()) {
        return `${format(new Date(t).getMonth()+1)}月${format(new Date(t).getDate())}日`;
    } else {
        return `${ new Date(t).getFullYear() }-${ format(new Date(t).getMonth()+1) }-${ format(new Date(t).getDate()) }`;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        formatTime (time: any, type: string): void
        marked (content: string): void
        hljsCode (): void
        debounce (fun: any, wait: number): void
    }
}
@Component
export default class mixin extends Vue {
    // methods : {
        /**
         * params {string} time
         * params {string} type
        */
        formatTime (time: any, type: string = '1') {
            let str: string = '';
            switch (type) {
                // yyyy-mm-dd hh:MM:ss
                case '1': 
                    time = new Date(time);
                    str = `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) } ${ format(time.getHours()) }:${ format(time.getMinutes()) }:${ format(time.getSeconds()) }`;
                    break;
                // yyyy-mm-dd
                case '2':
                    let date: any = new Date(time);
                    str = `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) }`;
                    break;
                // 倒计时
                case '3':
                    str = type3(time);
                    break;
            }
            return str;
        }
        /**
         * params {string} content
        */
        marked (content: string) { // 格式化文章
            return marked(content);
        }
        hljsCode () { // 代码高亮
            let blocks = document.querySelectorAll('pre code');
            let dom = Array.prototype.slice.call(blocks);
            dom.forEach((ele: any) => {
                hljs.highlightBlock(ele);
            })
        }
        /**
         * params {function} fun
         * params {number} number
        */
        // debounce (fun: any, wait: number = 100) { // 防抖
        //     let time: any = null;
        //     return function () {
        //         let args = arguments;
        //         clearTimeout(time);  // 清除上一次定时器，这里用到了闭包
        //         time = setTimeout(() => {
        //             fun.apply(this, args);
        //         }, wait) 
        //     } 
        // }
    // }
}