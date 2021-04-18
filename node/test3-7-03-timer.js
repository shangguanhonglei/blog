setImmediate(()=>{
    console.log('setImmediate');
})

setTimeout(()=>{
    console.log('setTimeout')
})

process.nextTick(()=>{
    console.log('nextTick')
})