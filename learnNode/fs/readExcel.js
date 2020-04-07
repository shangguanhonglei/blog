var xlsx2json = require("node-xlsx");
var fs = require("fs");

var list = xlsx2json.parse("./user.csv" );
// 一般读取到的数据为[[{data: []}],[{data: []}]]格式
// 具体情况自己打印观察一下 console.log(data)
// 我这里只做遍历list[0].data的遍历，具体情况具体处理
var data = [...(list[0].data)];
var arr = [];
for (let i = 1 ; i < data.length; i++) {
    const param = {
       // 这里对数据进行处理，具体情况具体处理，相应值赋给相应字段
       uid: data[i][0],
       sid: data[i][1],
       next_heart: data[i][2],
       last_visit_time: data[i][3],
       email: data[i][4],
       phone: data[i][5],
       user_id: data[i][6]
    };
    arr.push(param);
}
// 将数组转换成JSON格式并写入文件
var newData = []
arr[0].sid_count = 1
newData.push(arr[0])
for(let i = 1; i< arr.length; i++){
  if(arr[i].uid !== newData[newData.length-1].uid){
    arr[i].sid_count = 1
    newData.push(arr[i])
  }else {
    newData[newData.length-1].sid_count += 1
  }
}
var newDataJson = []
data[0].push('sid_count')
newDataJson.push(data[0])
for(let i = 0; i< newData.length; i++){
  newDataJson.push([newData[i].uid,newData[i].sid,new Date(1900, 0, newData[i].next_heart),new Date(1900, 0, newData[i].last_visit_time),newData[i].email,newData[i].phone,newData[i].user_id,newData[i].sid_count])
}
var buffer = xlsx2json.build([
    {
        name:'sheet1',
        data:newDataJson
    }
  ]);
fs.writeFileSync('./dataJson.xlsx',buffer,{'flag':'w'});