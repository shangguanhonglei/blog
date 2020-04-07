const mysql = require('mysql')
const config = require('./config')
const code = config.code
const connection = mysql.createConnection(config.db)
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
