//关于平台的信息
const { sep, delimiter, win32, posix } = require('path')
console.log('sep:' ,sep)
console.log('win32 sep:',win32.sep)
console.log('posix sep',posix.sep)
console.log('PATH',process.env.PATH)
console.log('delimiter',delimiter)
console.log('win32 delimiter:',win32.delimiter)
console.log('posix delimiter:',posix.delimiter)

