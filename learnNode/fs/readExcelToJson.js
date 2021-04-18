var xlsx2json = require("node-xlsx");
var list = xlsx2json.parse("./en.xlsx" );
var fs = require("fs");
var data = [...(list[0].data)];
const result = {}
data.forEach((element)=>{
  const keys = element[0].split('.')
  if(!result[keys[0]]){
    result[keys[0]] = {}
  }
  if(!keys[2]) {
    result[keys[0]][keys[1]] = element[1]
  }else {
    if(!result[keys[0]][keys[1]]) {
      result[keys[0]][keys[1]] = {}
    }
    result[keys[0]][keys[1]][keys[2]] = element[1]
  }
})

fs.writeFile('en.json', JSON.stringify(result), 'utf8', (err) => {
  if (err) throw err;
});
