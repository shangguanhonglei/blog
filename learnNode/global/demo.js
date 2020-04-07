//看似全局变量，实则不是
console.log(__dirname)
console.log(__filename)
//全局变量Buffer 类
const buf1 = Buffer.alloc(10);
console.log(buf1)