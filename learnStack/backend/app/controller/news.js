/*
 * @Author: tianll 
 * @Date: 2020-03-19 11:08:19 
 * @Last Modified by: tianll
 * @Last Modified time: 2020-03-19 14:01:27
 */
'use strict'
const Controller = require('egg').Controller
class NewsController extends Controller {
  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const newsList = await ctx.service.news.list(page)
    const dataList = {
      list: newsList,
    };
    await ctx.render('news/list.tpl', dataList)
  }
}

module.exports = NewsController
