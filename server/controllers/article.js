const Article = require('../models/article');

class ArticleController {
  // 创建文章
  static async createArticle(ctx, next) {
    const {
      title,
      content,
      publish,
      tags,
      abstract
    } = ctx.request.body;
    const createTime = new Date();
    const lastEditTime = new Date();

    if (!title) {
      ctx.throw(400, '标题不能为空！');
    }

    if (!content) {
      ctx.throw(400, '内容不能为空！');
    }

    if (!abstract) {
      ctx.throw(400, '摘要不能为空！');
    }

    const article = new Article({
      title,
      content,
      abstract,
      publish,
      createTime,
      lastEditTime,
      tags
    });

    let result = await article.save().catch(error => {
      ctx.throw(500, '服务器内部错误-数据存储错误！');
    });
    await result.populate('tags').execPopulate().catch(error => {
      ctx.throw(500, '服务器内部错误-数据populate错误！');
    });

    ctx.success({
      msg: '文章创建成功！',
      data: result
    });
  }

  // 获取单个文章
  static async getArticleById(ctx) {
    const id = ctx.params.id;
    let result = await Article.findById(id).catch(error => {
      ctx.throw(500, '服务器内部错误-数据查找错误！');
    });

    await result.populate('tags').execPopulate().catch(error => {
      ctx.throw(500, '服务器内部错误-数据populate错误！');
    });

    ctx.success({
      msg: '查询成功！',
      data: result
    });
  }

  // 发布文章
  static async ifPublishArticle(ctx) {
    const id = ctx.params.id;
    const publish = ctx.request.body.publish;
    if (publish !== true && publish !== false) {
      ctx.throw(400, 'publish字段不能为除true和false之外的值！');
    }

    let result = await Article.findByIdAndUpdate(id, {
      publish
    }, {
      new: true
    }).exec().catch(error => {
      ctx.throw(500, '服务器内部错误-updatePublish错误！');
    });

    ctx.success({
      msg: '更新publish成功！',
      data: result
    });
  }
}

exports = module.exports = ArticleController;
