function test1(){
    const a = Math.random() * 10 | 0
    const b = Math.random()*10 | 0
    test2(a,b)
}

function test2(a,b){
    if(a>b){
        a += a *2 
    }else{
        b-=a
    }
}
test1()