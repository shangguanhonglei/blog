# node
## node入门
- 使用 node 的 REPL（Read-eval-print loop） 模式
> 运行无参数的 node 将会启动一个 JavaScript的交互式 shell,进入 REPL 模式以后，会出现一个“>”提示符提示你输入命令，输入后按回车，Node.js将会解析并执行命令
- 建立 HTTP 服务器
> 与其他语言，如PHP不同，Node.js 将“HTTP服务器”这一层抽离，直接面向浏览器用户，引入http模块并创建一个createServer即可
```
//app.js
var http = require('http');
http.createServer(function(req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write('<h1>Node.js</h1>');
 res.end('<p>Hello World</p>');
}).listen(3000);
console.log("HTTP server is listening at port 3000."); 
```
**小技巧**
> 使用supervisor启动app.js可以监听代码变化自动重启node。因为node和PHP不同，浏览器每次请求PHP都会重新读取并解析脚本，而node只有在第一次启动会解析脚本文件，后面就直接从内存中读取了。
- 异步式 I/O 与事件式编程
> 其他语言采用同步式I/O：线程在执行中如果遇到磁盘读写或网络通信（统称为 I/O 操作），通常要耗费较长的时间，这时操作系统会剥夺这个线程的 CPU 控制权，使其暂停执行，同时将资源让给其他的工作线程，这种线程调度方式称为 阻塞。当 I/O 操作完毕时，操作系统将这个线程的阻塞状态解除，恢复其对CPU的控制权，令其继续执行。这种 I/O 模式就是通常的同步式 I/O（Synchronous I/O）或阻塞式 I/O （Blocking I/O）  
![](https://github.com/shangguanhonglei/blog/blob/master/nodejsTest/images/TIM%E6%88%AA%E5%9B%BE20190806193023.png?raw=true)  
> JS语言采用异步式 I/O 与事件式编程：当操作系统完成 I/O 操作时，以事件的形式通知执行 I/O 操作的线程，线程会在特定时候处理这个事件。为了处理异步 I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予以处理  
![](https://github.com/shangguanhonglei/blog/blob/master/nodejsTest/images/TIM%E6%88%AA%E5%9B%BE20190806193033.png?raw=true)  
> 异步I/O和同步I/O对比  
![](https://github.com/shangguanhonglei/blog/blob/master/nodejsTest/images/TIM%E6%88%AA%E5%9B%BE20190806193043.png?raw=true)    
- 事件
>  fs.readFile 和 http.createServer 的回调函数都是通过 EventEmitter 来实现的,遵循node的事件循环机制
```
//event.js
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function() {
 console.log('some_event occured.');
});
setTimeout(function() {
 event.emit('some_event');
}, 1000); 
```
**setTimeout/setImmediate/process.nextTick的区别**  
> 三者都是异步执行回调函数，只是执行顺序不同。可能是setTimeout回调函数执行结果在前，也可能是setImmediate回调函数执行结果在前，但setTimeout回调函数执行结果在前的概率更大些。这是因为他们采用的观察者不同，setTimeout采用的是类似IO观察者，setImmediate采用的是check观察者，而process.nextTick()采用的是idle观察者。  
***三种观察者的优先级顺序是：idle观察者>io观察者>check观察者***  
点击[链接](https://github.com/shangguanhonglei/blog/blob/master/nodejsTest/events/test.js)查看执行代码
- nodejs调试
> 执行命令```node --inspect-brk=0.0.0.0:8081 demo.js``` 
> 在浏览器中访问```chrome://inspect```打开需要调试的js按步调试
- 全局对象
> __dirname、__filename、exports、module、require() 不属于全局变量，而是nodejs编译后传进去的参数  
```
console.log(__dirname)
//编译后代码如下所示（可以通过chrome://inspect查看）
(function (exports, require, module, __filename, __dirname) 
{ 
  console.log(__dirname)
});
```
