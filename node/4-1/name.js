//获取路径文件名，路径名，扩展名
const { basename,dirname,extname } = require('path')
const filename = '/usr/local/bin/test.txt'
console.log(basename(filename))
console.log(extname(filename))
console.log(dirname(filename))