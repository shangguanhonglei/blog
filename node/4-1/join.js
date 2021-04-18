//合并路径为一个完整的路径
const { join } = require('path')
console.log(join('/usr/','local','bin'))
console.log(join('/usr/','../local','bin'))