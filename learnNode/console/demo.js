const fs = require('fs')
const { Console } = require('console')
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 正常输入、输出警告、输出错误
console.log('你好%s', '世界');
console.warn('警告描述');
console.error(new Error('错误信息'));
// 自定义的简单记录器。
const logger = new Console({ stdout: output, stderr: errorOutput });
for(let i = 0; i< 20; i++){
  const count = Math.round(Math.random()*10);
  if(count > 5){
    logger.log('output: %d',count)
  }else{
    logger.error('errorOutput: %d',count)
  }
}
// 简单的断言测试
console.assert(true, '什么都不做');// OK
console.assert(false, '%s 工作', '无法');// Assertion failed: 无法工作
// 清除终端输出
console.clear()
//特定于 label 的内部计数器
console.count('abc')
console.count('default')
console.count('abc')
console.count('abc')
//重置特定于 label 的内部计数器
console.countReset('abc');
console.count('abc');
//打印表格
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
//打印开始时间
//打印结束时间
console.time('100-elements');
for (let i = 0; i < 100; i++) {
  if(i === 50){
    //将经过时间和其他 data 参数打印
    console.timeLog('100-elements', i);
  }
  
}
console.timeEnd('100-elements');
