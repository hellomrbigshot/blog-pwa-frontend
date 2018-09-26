import axios from '@/libs/api.request'
import qs from 'qs'

export const getPageList = ({ type, status, content, pageSize: number = 10, page, secret: boolean = false }) => {
    const data = {
        type: type || '',
        status,
        content: content || '',
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