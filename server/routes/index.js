const config = require('../configs');
const Router = require('koa-router');
const router = new Router({
  prefix: config.app.routerBaseApi
});

const A = require('../controllers/article');
const T = require('../controllers/tag');
const U = require('../controllers/user');
const M = require('../controllers/me');

const checkToken = require('../middlewares/checkToken');

router
  // 获取单个文章
  .get('/articles/:id', A.getArticleById)
  // 创建文章
  .post('/articles', checkToken, A.createArticle)
  // 删除文章
  // .delete('/articles/:id', checkToken, A.deleteArticleById)
  // 修改文章
  // .patch('/articles/:id', checkToken, A.modifyArticle)
  // 获取所有文章
  // .get('/allArticles', checkToken, A.getAllArticles)
  // 获取所有已发布的文章
  .get('/articles', A.getAllPublishedArticles)
  // 发布或者不发布文章
  // .patch('/pubArticles/:id', checkToken, A.ifPublishArticle)

  // 创建标签
  // .post('/tags', checkToken, T.createTag)
  // 获取所有标签
  // .get('/tags', T.getAllTags)
  // 修改单个标签
  // .patch('/tags/:id', checkToken, T.modifyTag)
  // 删除单个标签
  // .delete('/tags/:id', checkToken, T.deleteTag)

  // 用户登录
  // .post('/login', U.login)

  // 获取个人信息
  // .get('/me', M.getMeInfo)
  // 更改个人信息
  // .patch('/me', checkToken, M.modifyMeInfo);

exports = module.exports = router;
