// 不足 10 自动补 0
function format (num: number = 0) {
    const result: string = num < 10 ? `0${num}` : `${num}`;
    return result;
}
function type3 (t: any) {
    let nowTime = new Date().getTime()
    let time = new Date(t).getTime();
    if (nowTime - time < 24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(60*60*1000))} 小时前`;
    } else if (nowTime - time < 7*24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(24*60*60*1000))} 小时前`;
    } else if (new Date().getFullYear() === new Date(t).getFullYear()) {
        return `${format(new Date(t).getMonth()+1)}月${format(new Date(t).getDate())}日`;
    } else {
        return `${ new Date(t).getFullYear() }-${ format(new Date(t).getMonth()+1) }-${ format(new Date(t).getDate()) }`;
    }
}
export default {
    methods : {
        formatTime (time: any, type: string = '1') {
            switch (type) {
                // yyyy-mm-dd hh:MM:ss
                case '1': 
                    time = new Date(time);
                    return `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) } ${ format(time.getHours()) }:${ format(time.getMinutes()) }:${ format(time.getSeconds()) }`;
                // yyyy-mm-dd
                case '2':
                    let date: any = new Date(time);
                    return `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) }`;
                // 倒计时
                case '3':
                    return type3(time);

            }
        }
    }
}