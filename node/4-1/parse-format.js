//解析路径信息及反解析
const { parse,format } = require('path')
const filename = '/usr/local/bin/test.js'
console.log(parse(filename))
console.log(format(parse(filename)))