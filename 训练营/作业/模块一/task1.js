// 代码题一
function task21(){
  const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let a = 'I'
      resolve(a)
    },10)
  })
  const p2 = p1.then((a)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        let ab = a + 'Love'
        resolve(ab)
      },10)
    })
  })
  p2.then((ab)=>{
    setTimeout(() => {
      let c = 'You'
      console.log(ab+ c)
    }, 10);
  })
}
task21()