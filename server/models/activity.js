const Activity = require('../lib/activity').Activity
module.exports = {
    // 创建动态
    create (activity) {
        return Activity.create(activity)
    },
    /**
     * 获取动态列表
     * @params {string} type ['page', 'comment']
     * @params {pageSize} number
     * @params {Count} number
     * @params {create_user} string
     *  
     * */
    getList (query) {
        const type = query.type
        const pageSize = query.pageSize
        const Count = query.Count
        let query_obj = {}
        if (type) {
            query_obj.type = type
        }
        if (create_user) {
            query_obj.create_user = create_user
        }
        if (pageSize && Count) {
            return Activity
                .find(query_obj)
                .skip(Count)
                .limit(pageSize)
                .exec()
        } else {
            return Activity
                .find(query_obj)
                .exec()
        }
    },
    // 获取动态数量
    getNum (query) {
        const type = query.type
        const pageSize = query.pageSize
        const Count = query.Count
        let query_obj = {}
        if (type) {
            query_obj.type = type
        }
        if (create_user) {
            query_obj.create_user = create_user
        }
        return Activity
            .find(query_obj)
            .countDocuments()
            .exec()
    }
    

}