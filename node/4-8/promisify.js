const fs = require('fs')
 const promisify = require('util').promisify;
 const read = promisify(fs.readFile)
// read('./promisify.js').then((data)=>{
//     console.log(data.toString())
// }).catch((e)=>{
//     throw e
// })
async function readFileTest(){
    try {
        const data = await read('./promisify.js')
        console.log(''+data)
    }
    catch(e){
        console.log(e)
    }
    
}
readFileTest()