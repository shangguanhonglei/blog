const db = require('./db')
//查询表数据
//const state = 'select * from users'
//插入数据
//const state = "INSERT INTO credit (cname,credit) VALUES ('应用数学','6'),('大学英语','6'),('线性代数','4'),('概率论','4')"
//条件查询
//const state = "select cname,credit from credit where credit > 4"
//update更新及where条件查询
//const state = "update users set username = 'shangguanhonglei' where age = '28' and email='123@qq.com'"
//update更新及like模糊查询
//const state = "update users set password = '963258',age = '30' where username like '%lin'"
//union联合查询
//const state = "select username from users where age > 25 union all select cname from credit where credit > 4"
//排序
//const state = "select * from users order by password desc"
//分组
//const state = "select name,count(*) as 'count' from employee_tbl group by name"
//with rollup
//const state = "SELECT name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP"
//使用函数将统计的总数null替换为总数，coalesce(a,b,c)函数规则为有a使用a，否则使用b，有b使用b，否则使用c
//const state = "SELECT coalesce(name, '总数') as employee_name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP"
//join语句
//const state = "select a.uid, a.username, b.grade from users a join grade b on a.uid = b.uid" //等同于"select a.uid,a.username,b.grade from users a,grade b where a.uid = b.uid"
// left join语句会查出左边表的所有数据right join语句同理
//const state = "select a.uid, a.username, b.grade from users a left join grade b on a.uid = b.uid"
//利用left join连接语句进行多对多关系表查询
//const state = "select a.username,b.grade,c.cname,c.credit from users a left join grade b on a.uid = b.uid left join credit c on b.cid = c.cid"
//多对多关系表精准查询，类似于系统登录逻辑
//const state = "select a.username,b.grade,c.cname,c.credit from users a left join grade b on a.uid = b.uid left join credit c on b.cid = c.cid where a.username = 'tianlei' and a.password = '123456'"
//利用正则表达式进行匹配
const state = "select username from users where username regexp '2$'"
db.query(state).then((res)=>{
  console.log(res)
})