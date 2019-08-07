//node模块导出类必须使用module.exports，其他变量、方法等推荐使用exports
const Person = require('./person.js')
const person = new Person('tianlei')
console.log(person.getName())
const circle = require('./circle.js')
console.log(circle.area(5))