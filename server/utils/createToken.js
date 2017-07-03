const config = require('../configs');
const jwt = require('jsonwebtoken');

// 返回一个token
module.exports = (userId) => {
  let privateKey = 'IMike';
  let expiresIn = '3600s';

  const token = jwt.sign({
    id: userId,
  }, privateKey, { expiresIn });

  return token;
};
