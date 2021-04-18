const http = require('http')
const fs = require('fs')
http.createServer(function(req,res){
    if(req.url === '/'){
        const html = fs.readFileSync('test.html')
        res.writeHead(200,{
            'Content-Type':'text/html',
            'Content-Security-Policy-Report-Only': "default-src 'self'; report-uri /report"
        })
        res.end(html)
    }else{
        res.setHeader('Content-Type','application/x-javascript')
        res.end('console.log(1)')
    }
}).listen(1227)