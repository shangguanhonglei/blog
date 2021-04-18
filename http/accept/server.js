var http = require('http')
var fs = require('fs')
const zlib = require('zlib')
http.createServer(function(req,res){
    console.log('request come',req.headers.host)
    const html = fs.readFileSync('test.html')
        res.writeHead(200,{
            'Content-Type':'text/html',
            'Content-Encoding': 'gzip'
        })
        res.end(zlib.gzipSync(html))
    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)