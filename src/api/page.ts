import axios from '@/libs/api.request.ts';
import qs from 'qs';

export const getPageList = (
  { type, status, content, pageSize, page, secret, keywords, sort } = { type: '', status: '', content: '', pageSize: 10, page: 1, secret: false, keywords: '', sort: 'create_time' },
  api: string = '/api/page/pagelist') => {
    const data = {
        type,
        status,
        content,
        pageSize,
        page,
        secret,
        keywords,
        sort
    };
    return axios.request({
        url: api,
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
export const sendComment = (
  { content, create_user, page_id, page_title, to_user } = { content: '', create_user: '', page_id: '', page_title: '', to_user: '' }
  ) => {
    const data = {
        content,
        create_user,
        page_id,
        page_title,
        to_user
    }
    return axios.request({
        url: '/api/comment/create',
        data: qs.stringify(data),
        method: 'post'
    })
}
export const getCommentListByPageId = (pageId: string) => {
    return axios.request({
        url: '/api/comment/getpagecommentlist',
        data: qs.stringify({ page_id: pageId }),
        method: 'post'
    })
}
