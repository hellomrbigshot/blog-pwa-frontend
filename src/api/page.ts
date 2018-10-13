import axios from '@/libs/api.request.ts';
import qs from 'qs';

export const getPageList = ({ type, status, content, pageSize, page, secret } = { type: '', status: '', content: '', pageSize: 10, page: 1, secret: false }) => {
    const data = {
        type,
        status,
        content,
        pageSize,
        page,
        secret
    };
    return axios.request({
        url: '/api/page/pagelist',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const getPageDetail = (id: string) => {
    return axios.request({
        url: '/api/page/detail',
        data: qs.stringify({ id }),
        method: 'post'
    })
}
export const searchPage = (keywords: string) => {
    return axios.request({
        url: '/api/page/searchpage',
        data: qs.stringify({ keywords }),
        method: 'post'
    })
}