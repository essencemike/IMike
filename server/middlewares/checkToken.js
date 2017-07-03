const config = require('../configs');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const authorization = ctx.get('authorization');
  if (authorization) {
    let token = authorization.split(' ')[1];
    try {
      let decoded = jwt.verify(token, 'IMike');
    } catch (err) {
      ctx.throw(401, 'expired token');
    }
  } else {
    ctx.throw(401, 'no token detected in http header Authorization');
  }

  await next();
};
