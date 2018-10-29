import axios from '@/libs/api.request.ts';
import qs from 'qs';
import { create } from 'domain';

export const getActivityList = ({ type, create_user, page, pageSize } = { type: '', create_user: '', page: 1, pageSize: 5 }) => {
    let data: any = {};
    if (type) { data.type = type };
    if (create_user) { data.create_user = create_user };
    data.page = page;
    data.pageSize = pageSize;
    return axios.request({
        url: '/api/activity/getlist',
        method: 'post',
        data: qs.stringify(data)
    })
}
export const getActivityNum = ({ type, create_user } = { type: '', create_user: '' }) => {
    let data: any = {}
    if (type) { data.type = type };
    if (create_user) { data.create_user = create_user };
    return axios.request({
        url: '/api/activity/getnum',
        method: 'post',
        data: qs.stringify(data)
    })
}