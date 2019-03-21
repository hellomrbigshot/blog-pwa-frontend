import axios from 'axios';
import { Toast } from 'vant';
import Cookies from 'js-cookie';
import router from '@/route/index';

class HttpRequest {
    baseUrl: string;
    queue: any;
    constructor (baseUrl: string) {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {

            }
        };
        return config;
    }
    distroy (url: string) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {}
    };
    interceptors (instance: any, url: string) {
        // 请求拦截
        instance.interceptors.request.use((config: any) => {
            // 添加全局 loading
            if (!Object.keys(this.queue).length) {}
            this.queue[url] = true;
            return config;
        }, (error: any) => {
            return Promise.reject(error);
        });
        instance.interceptors.response.use((res: any) => {
            this.distroy(url);
            const { code, data } = res.data;
            if (code === 'ERROR') {
                Toast.fail(data);
                return Promise.reject(data);
            }
            return { code, data };
        }, (error: any) => {
            this.distroy(url);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        Cookies.remove('user');
                        localStorage.removeItem('user');
                        router.replace({
                            name: 'login',
                            query: { redirect: router.currentRoute.fullPath }
                        });
                        break;
                    case 402:
                        Toast.fail('用户已登录');
                        break;
                }
            }
            return Promise.reject(error.resoinse ? error.response.data : error);
        })
    }
    request (options: any) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}
export default HttpRequest;
