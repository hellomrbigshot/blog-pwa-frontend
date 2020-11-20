import axios from '@/libs/api.request.ts'
import qs from 'qs'
interface IQuery {
  status: string,
  type: string,
  content: string,
  secret: boolean,
  sort?: string,
  keywords?: string
}

export const newPage = (title: string, tag: string[], content: string, status = 'normal', secret = false) => {
  const page = {
    title,
    content,
    tag,
    status,
    secret
  }
  return axios.request({
    url: '/api/page/new',
    data: qs.stringify(page),
    method: 'post'
  })
}
export const getPageList = (
  query: IQuery,
  api: string = '/api/page/pagelist') => {
  return axios.request({
    url: api,
    data: qs.stringify(query),
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
  { content, create_user, page_id, page_title, to_user, reply_user, reply_content } = { content: '', create_user: '', page_id: '', page_title: '', to_user: '', reply_user: '', reply_content: '' }
) => {
  const data = {
    content,
    create_user,
    page_id,
    page_title,
    to_user,
    reply_user,
    reply_content
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
