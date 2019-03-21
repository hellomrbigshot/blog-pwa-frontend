import axios from '@/libs/api.request.ts';
import qs from 'qs';

export const loginApi = ({ username, password } = { username: '', password: '' }) => {
    const data = {
        username,
        password
    };
    return axios.request({
        url: '/api/signin',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const registerApi = ({ username, password, repassword } = { username: '', password: '', repassword: '' }) => {
    const data = {
        username,
        password,
        repassword
    };
    return axios.request({
        url: '/api/signup',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const getUserInfo = (username: string) => { // 需要登录
    return axios.request({
        url: '/api/signin/getUserInfo',
        data: qs.stringify({ username }),
        method: 'post'
    })
}
export const getUserDetail = (username: string) => { // 无需登录
    return axios.request({
        url: '/api/user/detail',
        data: qs.stringify({ username }),
        method: 'post'
    })
}
