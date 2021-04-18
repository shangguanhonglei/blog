var http = require('http')
var fs = require('fs')
http.createServer(function(req,res){
    const host = req.headers.host
    console.log(host)
    if(req.url === '/'){
        const html = fs.readFileSync('test.html','utf8')
        res.end(html)
        if(host == 'test.com:1229'){
            res.writeHead(200,{
                'Content-Type':'text/html',
                'Set-Cookie':['id=123;max-age=2','abc=456;domain=test.com']
            })
            res.end(html)
        }else{
            res.writeHead(200,{
                'Content-Type':'text/html'
            })
            res.end(html)
        }
    }
    console.log('server127.0.0.1:1229正在启动')
}).listen(1229)