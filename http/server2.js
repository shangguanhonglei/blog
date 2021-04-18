var http = require('http')
http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/plain',
        'Access-Control-Allow-Origin':'http://127.0.0.1:1228',
        'Access-Control-Allow-Headers':'x-test-cors',
        'Access-Control-Allow-Methods':'PUT',
        'Access-Control-Max-Age':100
    })
    res.end('Hello World\n')
    console.log('server127.0.0.1:1227正在启动')
}).listen(1227)