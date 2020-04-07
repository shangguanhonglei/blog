const fs = require('fs')
class fileOprete {
  /**
   * 同步方式删除文件
   */
   removeBySync(){
    try {
      fs.unlinkSync('./hi.txt')
      console.log('删除成功')
    } catch (error) {
      throw error
    }
  }
  remove(){
  fs.unlink('./hello.txt',(err)=>{
    if(err) throw err
    console.log('delete success')
  })
  }
}
