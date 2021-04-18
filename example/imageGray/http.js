var http = require('http')
var fs = require('fs')
http.createServer(function(req,res){
    if(req.url === '/'){
        const html = fs.readFileSync('index.html','utf8')
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(html)
    }
    if(req.url==='/pic.jpeg') {
      var content =  fs.readFileSync('pic.jpeg',"binary");   
      res.writeHead(200, "Ok");
      res.write(content,"binary"); //格式必须为 binary，否则会出错
      res.end();
    }
    console.log('server127.0.0.1:1228正在启动')
}).listen(1229)