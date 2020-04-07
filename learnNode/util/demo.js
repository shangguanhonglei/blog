const util = require('util');

// async function fn() {
//   return 'hello world';
// }
// const callbackFunction = util.callbackify(fn);

// callbackFunction((err, ret) => {
//   if (err) throw err;
//   console.log(ret);
// });


// function fn() {
//   return Promise.reject(null);
// }
// const callbackFunction = util.callbackify(fn);

// callbackFunction((err, ret) => {
//   // 当 Promise 被以 `null` 拒绝时，它被包装为 Error 并且原始值存储在 `reason` 中。
//   err && err.hasOwnProperty('reason') && err.reason === null;  // true
// });


// console.log(util.format('%s:%s', 'foo','bar'));
// console.log(util.format('%d:%s', 5,'bar'));
// console.log(util.format('%s:%s', 'foo', 'bar', 'baz'))
// console.log(util.format('%% %s'))
// console.log(util.format('%o',{a:1,b:2}))
// console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }))


// function Person() { 
//   this.name = 'byvoid'; 
//   this.toString = function() { 
//   return this.name; 
//   }; 
// } 
// var obj = new Person(); 
// console.log(util.inspect(obj,true)); 

const fs = require('fs');

const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
  // 处理 `stats`。
  console.log(stats)
}).catch((error) => {
  // 处理错误。
});