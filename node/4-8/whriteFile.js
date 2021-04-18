const fs = require('fs')
const buf = Buffer.from('可以写入buffer')
fs.writeFile('./test.txt',buf,{
    encoding: 'utf8'
},err=>{
    if(err) throw err
})