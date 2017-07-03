const fs = require('fs');

let config = {
  admin: {
    username: 'admin',
    password: 'admin',
    name: 'IMike',
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'blog',
    port: 27017,
    user: '',
    password: '',
  },
  app: {
    port: process.env.PORT || 3000,
    routerBaseApi: '/api',
  }
};

if (fs.existsSync(__dirname + '/private.js')) {
  config = Object.assign(config, require('./private.js'));
}

module.exports = config;
