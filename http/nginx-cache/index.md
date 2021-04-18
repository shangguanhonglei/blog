# nginx代理
## nginx代理配置文件
1. mac通过Homebrew安装nginx  
2. vim /usr/local/etc/nginx/nginx.conf
> 下面这一句表示引入配置文件，和直接在nginx.conf进行配置是一样的效果
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190624-223946@2x.png?raw=true)
## nginx代理配置内容
```
server {
        listen 80;
        server_name www.zhangmin.com;
        location / {
           #代理到node服务本地服务
           proxy_pass    http://127.0.0.1:1228;
           #将Host设置为nginx代理的host
           proxy_set_header Host $host;
        }
}
```
> 如果没有proxy_set_header Host $host; 在本地node服务中，获取到的host将会是127.0.0.1  
- mac关于nginx命令
1. 启动命令： sudo nginx
2. 快速停止命令 sudo nginx -s stop
3. 平稳退出命令：sudo nginx -s quit
4. 重新加载配置文件命令：sudo nginx -s reload (当配置文件修改后，可执行此命令)
### 代理缓存
```
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
server {
        listen 80;
        server_name www.zhangmin.com;
        location / {
            # 使用代理缓存
           proxy_cache   my_cache;
           proxy_pass    http://127.0.0.1:1228;
           proxy_set_header Host $host;
        }
}
//服务端代码
if (req.url === '/data') {
    res.writeHead(200, {
        'Cache-Control': 's-maxage=200',//s-maxage专门针对代理服务器缓存
    })
    wait(2).then(()=>{
        res.end('success')
    })
}
```
### 根据头信息决定是否缓存
> Vary配置的参数是客户端进行http请求时需要带的头信息，在请求时如果值相同则使用代理服务器缓存，不同则重新请求
```
//服务端代码
if (req.url === '/data') {
    res.writeHead(200, {
        'Cache-Control': 's-maxage=200',
        'Vary': 'X-test-cache'
    })
    wait(2).then(()=>{
        res.end('success')
    })
}

//客户端代码
var index = 0
function doReques() {
    document.getElementById('data').innerHTML = ''
    fetch('/data', {
        headers:{
            'X-test-cache': index++
        }
    }).then((resp) => {
        return resp.text()
    }).then((text) => {
        document.getElementById('data').innerHTML = text
    })
}
document.getElementById('btn').addEventListener('click', function () {
    doReques()
})
```
### https配置
> 生成https公钥和私钥的命令如下
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 keyout localhost -privkey.pem -out localhost-cert.pem
```
> 执行上面的命令会生成两个文件
1. localhost-cert.pem
2. localhost-privkey.pem
> 修改nginx配置文件
```
# 配置这个server的目的是让用户访问的http直接跳转到https
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name www.zhangmin.com;
        return 302 https://$server_name$request_uri;

}
# https服务配置
server {
        # https监听443端口，后面的ssl表示开启https服务
        listen  443 ssl;
        server_name  www.zhangmin.com;
        # 下面这两句是配置https的公钥和私钥
        ssl_certificate_key  /usr/local/etc/nginx/certs/localhost-privkey.pem;
        ssl_certificate  /usr/local/etc/nginx/certs/localhost-cert.pem;
        location / {
           proxy_pass    http://127.0.0.1:1228;
           proxy_set_header Host $host;
        }
}
```
### http2
> http2优势  
1. 信道复用（TCP通道复用）
2. 分帧传输（二进制传输）
3. Server Push（服务端推送）
> 目前来说要配置http2必须要先配制成https  
```
server {
        # 开启http2很简单，只需要在listen中添加http2
        listen  443 ssl http2;
        server_name  www.zhangmin.com;
        # 开启http2主动的推送功能
        http2_push_preload on;
        ssl_certificate_key  /usr/local/etc/nginx/certs/localhost-privkey.pem;
        ssl_certificate  /usr/local/etc/nginx/certs/localhost-cert.pem;
        location / {
           proxy_pass    http://127.0.0.1:1228;
           proxy_set_header Host $host;
        }
}
```
> 这个连接[https://http2.akamai.com/demo/http2-lab.html](https://http2.akamai.com/demo/http2-lab.html)可以查看http2和http2之前版本的对比以及demo测试