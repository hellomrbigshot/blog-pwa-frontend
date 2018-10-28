const router = require('express').Router()
const ActivityModel = require('../models/activity')
const PageModel = require('../models/page')
const CommentModel = require('../models/comment')
const checkLogin = require('../middlewares/check').checkLogin
// 获取动态列表
router.post('/getlist', checkLogin, async (req, res, next) => {
    const type = req.body.type
    const create_user = req.body.create_user
    let page = req.body.page || 1
    pageSize = typeof pageSize === 'number' ? pageSize : parseInt(pageSize)
    page = typeof page === 'number' ? page : parseInt(page)
    const Count = pageSize * (page - 1)
    try {
        let [result, total] = await Promise.all([
            ActivityModel.getList({ type, create_user, pageSize, Count }), 
            ActivityModel.getNum({ type, create_user })
        ])
        result.length && await result.forEach(async (item, i) => {
            if (item.type === 'page') {
                item.content = await PageModel.getPageById(item.id)
            } else if (item.type === 'comment') {
                item.content = await CommentModel.getCommentById(item.id)
            }
        })
        res.status(200).json({ code: 'OK', data: { total, result } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router