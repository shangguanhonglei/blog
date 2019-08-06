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
![]()
![]()
![]()