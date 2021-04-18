var mongoose = require('mongoose')
var UsersSchema = require('../schemas/user') //拿到导出的数据集模块
var Users = mongoose.model('article2', UsersSchema) // 编译生成Movie 模型

module.exports = Users