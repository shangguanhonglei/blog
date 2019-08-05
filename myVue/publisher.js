class Publisher {
  /**
   * 构造函数
   */
  constructor(){
    this.subs = []
  }
  /**
   * 添加订阅器
   * @param {*} sub 
   */
  add(sub){
    this.subs.push(sub)
  }
  /**
   * 通知订阅者
   */
  notice(){
    this.subs.forEach(sub =>{
      sub.update()
    })
  }
   
} 
export default Publisher