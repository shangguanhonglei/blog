const { task } = require('folktale/concurrency/task')
const fs = require('fs')
const {split,find} = require('lodash/fp')
//task函子处理异步任务
function readFile(filename){
  return task(resolver=>{
    fs.readFile(filename,'utf-8',(err,data)=>{
      if(err) resolver.reject(err)
      resolver.resolve(data)
    })
  })
}
readFile('package-lock.json')
//调用task函子map函数传入lodash/fp中的split函数对文件内容进行分割
.map(split('\n'))
//查找文件中包括version的那一行
.map(find(x=>x.includes('version')))
.run()
.listen({
  onRejected(err){
    throw err
  },
  onResolved(data){
    console.log(data) //output: "version": "4.17.21",
  }
})