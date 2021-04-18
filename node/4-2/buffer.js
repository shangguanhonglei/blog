console.log(Buffer.alloc(12))
console.log(Buffer.alloc(10,1))
console.log(Buffer.allocUnsafe(10,1))
console.log(Buffer.from([1,2,3])) //输出1，2，3存储空间
console.log(Buffer.from('test')) //输出asc码编码的值