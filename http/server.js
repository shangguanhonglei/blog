var http = require('http')
var fs = require('fs')
http.createServer(function(req,res){
    if(req.url === '/'){
        const html = fs.readFileSync('test.html','utf8')
    
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(html)
    }
    if(req.url === '/script.js'){
        if(req.headers['if-none-match'] === 'eTag'){
            res.writeHead(304,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=2000000',
                'Last-Modified':'lastModified',
                'Etag':'eTag',
            })
            res.end('123')
        }else{
            res.writeHead(200,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=2000000',
                'Last-Modified':'lastModified',
                'Etag':'eTag',
            })
            res.end('console.log("script test four")')
        }
    }
    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)