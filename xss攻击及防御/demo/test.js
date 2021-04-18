var http = require('http')
var url = require('url');
var fs = require('fs')
http.createServer(function (req, res) {
    if(req.url === '/utils.js'){
        const utils = fs.readFileSync('utils.js', 'utf-8')
        res.writeHead(200, {
            'Content-Type': 'application/x-javascript',
        })
        res.end(utils)
    }
    var pathname = url.parse(req.url).pathname
    if (pathname === '/demo1') {
        const html = fs.readFileSync('demo1.html', 'utf-8')
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(html)
    }
    
    else if (pathname === '/demo2') {
        const html = fs.readFileSync('demo2.html', 'utf-8')
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(html)
    }
    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)