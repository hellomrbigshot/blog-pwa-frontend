const mongoose = require('./mongo')
const Scheme = mongoose.Schema

const ActivitySchema = new Schema({
    create_user: { type: String }, // 创建人
    create_time: { type: Date }, // 创建时间
    update_time: { type: Date, default: Date.now }, // 更新时间
    type: { type: String }, // 动态类型
})

exports.Activity = mongoose.model('Activity', ActivitySchema)
