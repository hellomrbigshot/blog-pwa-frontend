import axios from '@/libs/api.request.ts';
import qs from 'qs';

export const getTagList = ({ page, pageSize } = { page: 1, pageSize: 10 }) => {
    const data = {
        page,
        pageSize
    };
    return axios.request({
        url: '/api/tag/taglist',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const getTagDetail = (name: string) => {
    const data = {
        name
    };
    return axios.request({
        url: '/api/tag/tagdetail',
        data: qs.stringify(data),
        method: 'post'
    })
}