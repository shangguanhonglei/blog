//规范化给定的 path，解析 '..' 和 '.' 片段
const {normalize} = require('path')
console.log(normalize('/usr/local//bin'))
console.log(normalize('/usr//local/../bin'))