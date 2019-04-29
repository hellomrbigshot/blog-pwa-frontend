import axios from '@/libs/api.request.ts'
import qs from 'qs'

export const getCommentList = (
  { type, create_user, to_user, page, pageSize } = { type: 'to_user', create_user: '', to_user: '', page: 1, pageSize: 10 }
) => { // 获取评论列表
    let data = {
        type,
        create_user,
        to_user,
        page,
        pageSize
    }
    return axios.request({
        url: '/api/comment/getusercommentlist',
        method: 'post',
        data: qs.stringify(data)
    })
}
export const updateCommentStatus = (ids: any[] = []) => { // 将评论标记为 已读
  return axios.request({
    url: '/api/comment/updatecommentstatus',
    method: 'post',
    data: qs.stringify({ ids })
  })
}
export const getUnReadCommentNum = () => { // 获取未读评论数量
  return axios.request({
    url: '/api/comment/getUnreadCommentNum',
    method: 'get'
  })
}

