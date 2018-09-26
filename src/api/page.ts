import axios from '@/libs/api.request';
import qs from 'qs';

export const getPageList = ({ type: string, status: string, content: string = '', pageSize: number = 10, page: number = 1, secret: boolean = false }) => {
    const data = {
        type,
        status,
        content,
        pageSize: pageSize || '10',
        page: page || '',
        secret: secret || 'normal'
    };
    return axios.request({
        url: 'login',
        data: qs.stringify(data),
        method: 'post'
    })
}