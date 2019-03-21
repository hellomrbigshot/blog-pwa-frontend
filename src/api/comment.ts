import axios from '@/libs/api.request.ts';
import qs from 'qs';

export const getCommentList = ({type, create_user, to_user, page, pageSize} = { type: 'to_user', create_user: '', to_user: '', page: 1, pageSize: 10 }) => {
    let data = {
        type,
        create_user,
        to_user,
        page,
        pageSize
    };
    return axios.request({
        url: '/api/comment/getusercommentlist',
        method: 'post',
        data: qs.stringify(data)
    })
}
