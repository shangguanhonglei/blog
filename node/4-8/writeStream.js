const fs = require('fs')
const ws = fs.createWriteStream('./test.txt')
let interval = setInterval(()=>{
    const num = parseInt(Math.random()*10)
    if(num<9){
        ws.write(''+num)
    }else{
        ws.end()
    }
},200)
ws.on('finish',()=>{
    clearInterval(interval)
    console.log('done')
})
