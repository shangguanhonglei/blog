//process.nextTick()与setImmediate()和setTimeout()的区别如下：
//三种观察者的优先级顺序是：idle观察者>>io观察者>check观察者
//执行结果顺序为1=>5=>4=>2=>3也有可能是1=>5=>4=>3=>2
console.log('1')
setTimeout(function(){
    console.log('2')
})
setImmediate(function(){
    console.log('3')
})
process.nextTick(function(){
  console.log('4')
})
console.log('5')