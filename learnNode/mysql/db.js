const mysql = require('mysql')
const config = require('./config')
const db = {
  host: '127.0.0.1',//主机地址
  user: 'root',//用户名
  password: 'root',//密码
  database: 'my_db',//数据库名
  port: '3306',//数据库端口
}
const code = config.code
const connection = mysql.createConnection(Object.assign({},db,config.db))
exports.query = (sql)=>{
  const result = {}
  return new Promise((resolve,reject)=>{
    connection.connect()
    connection.query(sql,(err,data)=>{
      const result = {
        data: data,
        code: code.success
      }
      if(err){
        result = {
          data: [],
          code: code.fail
        }
      }
      resolve(result)
    })
    connection.end()
  })
}
