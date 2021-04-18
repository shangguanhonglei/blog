var http = require('http')
var fs = require('fs')
const wait = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time*1000)
    })
}
http.createServer(function (req, res) {
    console.log('request come', req.headers.host)
    if (req.url === '/') {
        const html = fs.readFileSync('test.html', 'utf-8')
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(html)
    }
    if (req.url === '/data') {
        res.writeHead(200, {
            'Cache-Control': 's-maxage=200',
            'Vary': 'X-test-cache'
        })
        wait(2).then(()=>{
            res.end('success')
        })
    }

    console.log('server127.0.0.1:1228正在启动')
}).listen(1228)