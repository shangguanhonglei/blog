'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello world';
  }
  async list() {
    const dataList = [
      { id: 1, url: '/news/1', title: '第一条消息' },
      { id: 2, url: '/news/2', title: '第二条消息' },
    ];
    await this.ctx.render('news/list.tpl', dataList);
  }
}

module.exports = HomeController;
