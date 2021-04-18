var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    console.log('request come', req.headers.host)
    const html = fs.readFileSync('test.html', 'utf-8')
    const img = fs.readFileSync('test.jpg')
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Connection': 'close',
            'Link': '</test.jpg>; as=image; rel=preload'
        })
        res.end(html)
    }else {
        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Connection': 'close',
        })
        res.end(img)
    }


    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)