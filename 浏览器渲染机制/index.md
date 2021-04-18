> 浏览器内核分为两个部分，一是渲染引擎，二是JS引擎（在《js编译原理》中有记录）
# 浏览器渲染  
## 页面加载过程
> 在接受浏览器渲染之前先介绍下页面的加载过程。要点如下：
1. 浏览器根据DNS服务器得到域名的IP地址
2. 向这个IP的机器发送HTTP请求
3. 服务器收到、处理并返回HTTP请求
4. 浏览器得到返回内容
> 例如： 在浏览器输入https://juejin.im/timeline,然后经过DNS解析，juejin.im对应的IP是36.248.217.149（不同时间，不同地点对应的IP可能不同）。然后浏览器向该IP发送请求。  服务端接收到HTTP请求，然后经过计算返回请求。通常就是一堆HTML格式的字符串。接下来就是浏览器渲染过程。  
## 浏览器渲染过程
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%A7%A3%E6%9E%90.png)
> 浏览器渲染过程大体如下：
### 浏览器会解析三个东西
1. HTNL/SVG/XHTML字符串描述了一个页面的结构，浏览器会把这些字符串解析转换为DOM树形结构
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/dom%E8%A7%A3%E6%9E%90.gif)
2. CSS,解析CSS会产生CSS规则树，他和DOM结构比较像
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/cssom.jpg)
3. js,等到js脚本文件加载完成后，通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/js%E8%A7%A3%E6%9E%90.gif)
### 解析完成后，浏览器引擎会通过DOM Tree和CSS Rule Tree来构造Rendering Tree
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/render.png)
> **渲染树并不是DOM Tree和CSS Tree简单的融合** 渲染树只会包括需要显示的节点和这些节点的样式信息，如果某个节点是display:none;那么这个节点就不会在渲染树中显示。  
> 渲染过程中遇到```<script>``` 渲染就会暂停，执行js脚本。这也就是为什么建议将js放在body标签底部，以及不建议将js放在网站首屏的原因。并不是说必须将js放在底部。也可以给```<script>```标签加defer或者async属性。  
- js文件不只是阻塞DOM的构建，它会导致CSSOM也阻塞DOM的构建  
> 这是因为 JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。因为不完整的 CSSOM 是无法使用的，如果 JavaScript 想访问 CSSOM 并更改它，那么在执行 JavaScript 时，必须要能拿到完整的 CSSOM。所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM。
### 布局与绘制
> 当浏览器生成渲染树以后就会根据渲染树进行布局（也叫回流）。这一阶段浏览器要做的事情是要弄清楚各个节点在页面中的确切位置和大小。  
> 布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸，所有相对测量值都将转换为屏幕上的绝对像素。  
### async和defer的作用和区别  
![](https://github.com/shangguanhonglei/blog/blob/master/images/deferAsync.png?raw=true)
1. **情况 1：```<script src="script.js"></script>```**
> 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。  
2. **情况 2：```<script async src="script.js"></script> ```(异步下载)**
> async 加载的js可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行  
3. **情况 3：<script defer src="script.js"></script>(延迟执行)**
> 整个 document 解析完毕且 defer-script 也加载完成之后（这两件事情的顺序无关），会执行所有由 defer script 加载的 JavaScript 代码，然后触发 DOMContentLoaded 事件  
> 总结： async 是无顺序的加载，而 defer 是有顺序的加载
### 为什么操作DOM慢？
> 把 DOM 和 JavaScript 各自想象成一个岛屿，它们之间用收费桥梁连接。——《高性能 JavaScript》  
> DOM属于**渲染引擎**中的东西，js属于**js引擎**中的东西，当我们用 JS 去操作 DOM 时，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”这个“跨界交流”的实现并不简单，它依赖了桥接接口作为“桥梁”（如下图）  
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/dom%E9%80%9A%E4%BF%A1.png)
> 过桥是要收费的，所以每访问或者操作一次DOM都要过一次桥，过的次数多了就会引起性能问题。所以建议尽量减少DOM操作，如果必须要访问则增加DOM对象缓存。
### 你真的了解回流和重绘吗？
> 渲染的流程基本上是这样（如下图黄色的四个步骤）：
1. 计算 CSS 样式
2. 构建 Render Tree
3. Layout – 定位坐标和大小
4. 正式开画
![](https://raw.githubusercontent.com/shangguanhonglei/blog/master/images/reflow.png)
> 注意：上图流程中有很多连接线，这表示了 Javascript 动态修改了 DOM 属性或是 CSS 属性会导致重新 Layout，但有些改变不会重新 Layout，就是上图中那些指到天上的箭头，比如修改后的 CSS rule 没有被匹配到元素。  

> 这里重要要说两个概念，一个是 Reflow，另一个是 Repaint  

> 重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。  

> 回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来，这个过程就是回流（也叫重排）  

> 回流必定会发生重绘，重绘不一定会引发回流。重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。
- 常见引起回流属性和方法  
> 任何会改变元素几何信息 (元素的位置和尺寸大小) 的操作，都会触发回流，

1. 添加或者删除可见的 DOM 元素；
2. 元素尺寸改变——边距、填充、边框、宽度和高度；
3. 内容变化，比如用户在 input 框中输入文字；
4. 浏览器窗口尺寸改变——resize 事件发生时；
5. 计算 offsetWidth 和 offsetHeight 属性；
6. 设置 style 属性的值。
- 如何减少回流、重绘
1. 使用 transform 替代 top
2. 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
3. 不要把节点的属性值放在一个循环里当成循环里的变量
4. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
5. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
6. CSS 选择符从右往左匹配查找，避免节点层级过多
7. 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层

