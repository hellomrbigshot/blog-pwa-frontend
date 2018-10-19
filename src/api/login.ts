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
export const Register = ({ username, password } = { username: '', password: '' }) => {
    const data = {
        username,
        password
    };
    return axios.request({
        url: '/api/signup',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const getUserInfo = (username: string) => {
    return axios.request({
        url: '/api/signin/getUserInfo',
        data: qs.stringify({ username }),
        method: 'post'
    })   
}