/*
 * @Description: 
 * @Author: tianleilei1
 * @Date: 2021-07-09 16:57:15
 * @LastEditTime: 2021-07-09 16:59:57
 * @LastEditors: tianleilei1
 */
var http = require('http')
var fs = require('fs')
http.createServer(function(req,res){
    if(req.url === '/'){
        const html = fs.readFileSync('index.html','utf8')
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(html)
    }
    if(req.url==='/gl-matrix-min.js') {
      var content =  fs.readFileSync('gl-matrix-min.js',"binary");   
      res.writeHead(200, "Ok");
      res.write(content,"binary"); //格式必须为 binary，否则会出错
      res.end();
    }
    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)