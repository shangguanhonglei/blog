var Users = require('../models/users');//导入模型数据模块
var Utils = require('../utils')
var xss = require("xss");
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.set('X-XSS-Protection', 0)
    //var xssStr = Utils.encodeHtml(req.query.xss)
    var imageSrc = Utils.encodeHtmlProperty(req.query.image)
    res.render('index', { title: 'xss反射型测试', xss: req.query.xss, imageSrc })
  })
  app.get('/article', function (req, res) {
    res.set('X-XSS-Protection', 0)
    res.render('article', { title: '发表新闻' })
  })
  app.get('/users', function (req, res) {
    Users.find(function (err, users) {
      if (err) {
        console.log(err);
      }
      users.forEach((item,index)=>{
        let content = Utils.xssFilter(item.content)
        item.content = content
      })

      res.render('users', { title: '新闻列表', users: users })
    })

  })
  app.post('/data',function(req,res){

    var user = new Users({
      user:req.body.user,
      content: req.body.content,
    })
    user.save(function(err,data){
      if(err){
        console.log(err)
      }
      res.redirect('/users');
    })
  })
}
