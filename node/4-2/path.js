const path = require('path')
//__dirname和__filename 总是返回当前执行文件的绝对路径
console.log('__dirname     ',__dirname)
console.log('__filename    ',__filename)
//cwd和./返回当前在哪执行的路径
console.log('process.cwd() ',process.cwd())
console.log('./',path.resolve('./'))