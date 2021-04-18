# http

- http响应图  
![](https://github.com/shangguanhonglei/blog/blob/master/images/http.png?raw=true)
> 关于http响应图的说明
```
Redirect: 输入一个地址先进行跳转（理解不透彻）
App Cache缓存：检测浏览器是否已有缓存
DNS：查找域名对应的IP
TCP：经过TCP连接三次握手创建TCP连接
Request：发送http请求的数据包
Response：返回数据
```
## 网络协议分层
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190615-120257@2x.png?raw=true)
- 低三层 
1. 物理层是指网卡、网线等硬件设备相关如何传输数据  
2. 数据链路层是指在通信的实体见建立数据链路连接  
3. 网络层为数据在节点之间传输创建逻辑链路  
- 传输层(TCP、UDP)
1. 向用户提供可靠的端到端服务（客户端到服务端）
2. 传输层向高层屏蔽了下层数据通信的细节（比如在发送http协议时，用户感知不到底层通信）  
- 应用层（HTTP、FTP）
1. 构建于TCP协议之上
2. 屏蔽数据通信的细节  
## HTTP发展历史
- HTTP/0.9
1. 只有一个命令GET
2. 没有header等描述数据的信息
3. 服务器发送完毕，就关闭TCP
- HTTP/1.0
1. 增加了很多命令POST、PUT、DELETE等
2. 增加了status code和header
3. 多字符集支持、多部分发送、权限、缓存等
- HTTP/1.1
1. 持久连接
> 1.0版本一个http请求就创建一个TCP，1.1在一个TCP中可以发送多个http请求  
2. pipeline
> 一个TCP多个请求，服务端需要按照顺序返回
3. 增加host和其他一些命令
4. 在chrome中并发数一般为6个
> 也就是说一次性最多创建6个TCP连接，后面的资源就会排队等待这6个通道
- HTTP/2.0
1. 所有数据以二进制传输（之前是字符串）
2. 同一个连接发送多个请求，不再需要按照顺序
3. 头信息压缩以及推送等提高效率的功能
## TCP三次握手
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190615-132324@2x.png?raw=true)
> SYN（synchronous）是TCP/IP建立连接时使用的握手信号、Seq(Sequence number 序列号)、ACK（Acknowledge number确认号码）
## URI、URL、URN
- URI
1. Uniform Resource Identifier，统一资源标识符。
2. 用来唯一标识互联网上的信息资源，例如：访问http://www.tianlei.com 对应的就是服务器中的index.html页面
3. 包含URL和URN
- URL
1. Uniform Resource Locator，统一资源定位符。
2. http://user:pass@host.com:80/path?query=string#hash
- URN
1. Uniform Resource Name，永久统一资源定位符
2. 在资源移动后还能找到
## HTTP报文
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190615-143102@2x.png?raw=true)
- HTTP Method
> get、post、delete、put表示不同的语义的方法。但是具体怎么实现在于开发者自己
- HTTP Code
1. 定义服务器对请求的处理结果
2. 各个区间的code有各自的语义
```
100-199:操作没有执行完成，要继续执行才能返回结果
200-299:操作成功
300-399:需要重定向，用别的方式获取数据
400-499:发送的请求有问题，401表示发送请求没有权限
500-599:服务器错误
```
3. 一个好的http服务是可以通过code判断结果。目前国内很多网站返回的code只有200或者500，然后再自己定义一个状态码来表示当前的状态，这样是非常不好的
## linux命令curl
> 不止是浏览器可以请求，在客户端是用curl命令也可以请求
```
curl www.baidu.com
```
## 响应头
- 'Content-Type':'text/plain'
> 这个属性称为互联网媒体类型，也叫做MIME类型。他用来告诉服务端如何请求数据，告诉客户端如何解析响应的数据，比如显示图片，解析并展示html等。
```
response.setHeader('Content-Type', 'text/html');
```
- 跨域请求 'Access-Control-Allow-Origin':'http://127.0.0.1:1228'
> 用来设置是否跨域，如果为*表示允许任一站点访问。也可以指定具体允许访问的一个或几个站点
```
response.setHeader('Access-Control-Allow-Origin', '*');
```
- CORS预请求
> CORS为浏览器和服务器跨域请求机制，预请求是在某些特定的请求过程中会增加预请求。  浏览器进行预请求的情况如下：
1. 在跨域请求中人为设置了除 [CORS 安全的首部字段集合](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 之外的自定义字段
```
//客户端代码
fetch('http://127.0.0.1:1227/',{
    method: 'POST',
    headers:{
        'x-test-cors':'123'
    }
})
//服务端代码
response.writeHead(200,{
    'Content-Type':'text/plain',
    'Access-Control-Allow-Origin':'http://127.0.0.1:1228',
    //允许客户端自定义的字段访问，否则预请求报错
    'Access-Control-Allow-Headers':'x-test-cors',
})
```
2. 在跨域请求中CORS默认允许的方法只有GET、POST、HEAD。除此之外都要进行预请求
```
//客户端代码
fetch('http://127.0.0.1:1227/',{
    method: 'PUT'
})
//服务端代码
response.writeHead(200,{
    'Content-Type':'text/plain',
    'Access-Control-Allow-Origin':'http://127.0.0.1:1228',
    //在服务端要允许PUT方法，否则预请求报错
    'Access-Control-Allow-Methods':'PUT,DELETE'
})
```
3. 在跨与请求中对允许的Content-Type也有限制除了下面三个，其他的都要进行预请求
```
1. text/plain
2. multipart/form-data
3. application/x-www-form-urlencoded
```
4. 预请求的缓存属性```Access-Control-Max-Age```
> 为当前的预请求进行缓存，如果设置为100表示在100s内不用在进行预请求
```
response.writeHead(200,{
        'Content-Type':'text/plain',
        'Access-Control-Allow-Origin':'http://127.0.0.1:1228',
        'Access-Control-Allow-Headers':'x-test-cors',
        'Access-Control-Allow-Methods':'PUT',
        'Access-Control-Max-Age':100
    })
```
## 缓存Cache-Control
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190618-132110@2x.png?raw=true)
- 可缓存性
1. public
> 从服务器到代理服务器到浏览器都可以进行缓存
2. private
> 只有发起请求的浏览器可以进行缓存
3. no-cache
- 和public相反，都不可以进行缓存，但必须到服务端进行验证。no-cache只是针对浏览器缓存的禁用
- 到期
1. max-age = <seconds>
> 资源缓存在浏览器中，如果不强制刷新，在缓存期内一直使用浏览器缓存。
```
if(req.url === '/script.js'){
    res.writeHead(200,{
        'Content-Type':'text/javascript',
        'Cache-Control':'max-age=200',
    })
    res.end('console.log("script test five")')
}
> 在缓存期内如果返回资源变更，返回内容依然使用浏览器缓存。这时候我们就要增加文件版本号，来改变url。重新请求服务器，得到正确的返回值。
```
res.end('console.log("script test six")')//打印出来的依然是'script test five'
```
```
2. s-maxage = <seconds>
> 专门针对代理服务器缓存
3. max-stale = <seconds>
> 发起请求方带的头，即便max-age 已经过期，还可以是用过期的内容
- 重新验证
1. must-revalidate
2. proxy-revalidate
- 其他
1. no-store
> 和no-cache的区别是，no-cache需要去服务端进行验证，no-store不用验证。针对浏览器及所有服务器的缓存
2. no-transform
- 验证头
1. Last-Modified
> 给资源设置上次修改时间  
> 配合If-Modified-since和If-UnModified-Since  
> 对比上次修改时间，验证资源是否需要更新  
2. Etag
> 数据签名     
> 配合If-Match或者If-None-Match使用    
> 对比资源的签名判断是否使用缓存  
```
if(req.url === '/script.js'){
    res.writeHead(200,{
        'Content-Type':'text/javascript',
        //这里增加no-cache原因是禁止使用缓存，但请求必须到达服务端
        'Cache-Control':'max-age=2000000,no-cache',
        'Last-Modified':'lastModified',
        'Etag':'eTag',
    })
}
```
> 第一次请求浏览器会在服务器获取资源，第二次请求就会携带If-Modified-since和If-None-Match    
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190618-141034@2x.png?raw=true)
> 需要在服务端进行判断是否存在etag，如果存在返回304，否则返回200  
```
if(req.url === '/script.js'){
    if(req.headers['if-none-match'] === 'eTag'){
        res.writeHead(304,{
            'Content-Type':'text/javascript',
            'Cache-Control':'max-age=2000000,no-cache',
            'Last-Modified':'lastModified',
            'Etag':'eTag',
        })
        res.end('123')
    }else{
        res.writeHead(200,{
            'Content-Type':'text/javascript',
            'Cache-Control':'max-age=2000000,no-cache',
            'Last-Modified':'lastModified',
            'Etag':'eTag',
        })
        res.end('console.log("script test four")')
    }
}
```
> 此时浏览器依然返回'console.log("script test four")'这是因为状态吗304就表示读取缓存。  
> 如果将上面例子中的no-cache去掉，则又会使用浏览器缓存from memory cache  
> 如果将上面例子中的no-cache替换成no-store，则禁用所有缓存包括浏览器缓存from memory cache及Etag缓存304  
## cookie
> 在服务端返回数据时通过Set-Cookie设置，保存在浏览器中，下次在同域请求时就会带上  
- cookie属性
1. max-age和expires设置过期时间
> max-age表示多长时间后过期，expires表示到什么时间过期
2. Secure只在https的时候发送
3. HttpOnly无法通过document.cookie访问  
```
// abc=456在前端页面无法用document.cookie打印
//domain属性用来指定cookie所属域，如果domain=*.test.com表示test.com域名下所有子域都可以访问
res.writeHead(200,{
    'Content-Type':'text/html',
    'Set-Cookie':['id=123;max-age=2','abc=456;HttpOnly','test=678;domain=test.com']
})
```
## 长连接
> http/1.1和http/2.0 都采用长连接的形式，创建一个TCP，然后对这个TCP进行复用，不同的是http/1.1需要按照顺序同步请求。http/2.0创建的TCP可以同时发送多个http，不需要排队。所以一般http/2.0只开一个TCP连接就够了，极大的降低了资源的损耗。  
> 一般的http默认开启长链接，当然也可以关闭长链接，如果关闭，则一个http对应一个TCP。这样将及其耗费资源，形式如下：
```
res.writeHead(200, {
    'Content-Type': 'image/jpg',
    'Connection': 'close', // 默认值keep-alive不用设置
})
```
## 数据协商
### 客户端发送的参数
- Accept
> 指定客户端要的数据类型  
- Accept-Encoding
> 代表数据以怎样的编码方式进行传输，限制服务端进行怎样的数据压缩，目前比较流行的是gzip, deflate, br
- Accept-Language
> 希望返回的语言
- User-Agent
> 用来表示浏览器的信息  
- multipart/form-data 
```
 <form id="form" action="/form" enctype="multipart/form-data" method="POST">
        <input type="text" name="name">
        <input type="password" name="password">
        <input type="file" name="file">
        <input type="submit" >
    </form>
```
> 如果表单中有文件上传，则必须将enctype设为multipart/form-data，上传过程中文件会单独根据上传的文件类型自动设置Content-Type的值，例如：上传了一个图片，Content-Type为image/png，下面为上传过程中部分代码：
```
------WebKitFormBoundarynDJyBfdkoW3jXfzx
Content-Disposition: form-data; name="file"; filename="QQ20190618-141034@2x.png"
Content-Type: image/png

```
### 服务端返回的参数Content
- Content-Type
> 对应Accept，表示实际返回的数据类型
- Content-Encoding
> 对应Accept-Encoding，服务端具体用了怎样的压缩方式，目前比较流行的是gzip, deflate, br  
> 开启gzip压缩之后，chrome浏览器network中的Size会减小，就表明压缩了。下面的灰色字节表示解压之后的大小（包括头信息，所以有时会比Size要大），和是否进行gzip压缩没有关系。
- Content-Language
> 对应Accept-Language，表示实际以什么语言返回
## 重定向
> 重定向就是访问地址A，转而访问地址B
```
// 当浏览器访问服务器http://www.tianlei.com会自动转向访问地址http://www.tianlei.com/new
if(req.url === '/'){
    res.writeHead(301,{
        "Location":"/new"
    })
    res.end()
}
if(req.url === '/new'){
    res.writeHead(200,{
        "Content-Type":"text/plain"
    })
    res.end('Hello World\n')
}
```
> 302和301都表示重定向，302代表暂时性转移，301代表永久性转移。301表示旧地址A的资源已经被永久地移除了，302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B
## CSP
> Content Security Policy 的缩写，允许站点管理者控制用户代理能够为指定的页面加载哪些资源  
> **详情请查看本期文章[《xss攻击与防御》](https://github.com/shangguanhonglei/blog/issues/18)**