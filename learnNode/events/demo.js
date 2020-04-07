//事件触发器
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
myEmitter.on('my_event',()=>{
  console.log('触发事件 my_event')
}) 
setTimeout(()=>{
  myEmitter.emit('my_event')
},2000)


//将参数和this传给监听器
//监听器使用箭头函数，this关键词不会指向myEmitter
myEmitter.on('my_event_params',function(a,b){
  console.log(a,b,this,this===myEmitter)
})
setTimeout(()=>{
  myEmitter.emit('my_event_params',1,2)
},2000)
//使用 eventEmitter.once() 可以注册最多可调用一次的监听器
let m = 0;
myEmitter.once('my_event_once', () => {
  console.log(++m);
});
myEmitter.emit('my_event_once');
// 打印: 1
myEmitter.emit('my_event_once');
// 不触发