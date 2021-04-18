const fs = require("fs")
const json2xls = require("json2xls")
const readLang = (file)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf8',(err,data)=>{
      if(err) throw err
      resolve(data)
    })
  })
}
let newData = []
const dealData = async ()=>{
  const json = await readLang('./zh.json')
  const data = JSON.parse(json)
  newData = []
  getLangSet('',data)
  let xls = json2xls(newData)
  fs.writeFileSync('zh-cn.xlsx',xls,'binary')
}
const getLangSet = (key,data)=>{
  for(let i in data) {
    if(!isPlainObject(data[i])) {
      let temp = {
        '字段': `${key}.${i}`,
        '中文': data[i],
        '英文': ''
      }
      newData.push(temp)
    }else {
      let newkey = key ? `${key}.${i}` : i
      getLangSet(newkey,data[i])
    }
  }
}
const isPlainObject = obj => typeof obj === 'object' && obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
dealData()

