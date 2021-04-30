//演示 lodash
//first、last、toUpper、reverse、each、includes、find、findIndex
const _ = require('lodash')
const array = ['a','b','c','d']
console.log(_.first(array))
console.log(_.last(array))
console.log(_.toUpper(_.first(array)))
console.log(_.reverse(array)) //不是纯函数，改变了原始数组的顺序
const r = _.each(array,(item)=>{
  console.log(item)
})
console.log(r)
console.log(_.includes(array,'a'))