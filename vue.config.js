const path = require('path');
const fs = require('fs');

const resolve = dir => path.join(__dirname, dir);

const env = process.env.NODE_ENV || 'development';
fs.writeFileSync(path.join(__dirname, './config/env.ts'), `export default '${env}';`);

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = env === 'production' ? '/blog/' : '/';

module.exports = {
  baseUrl: BASE_URL,

  // 开发环境配置 server proxy
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '<url>',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //     '/foo': {
  //       target: '<other_url>'
  //     }
  //   }
  // },

  chainWebpack: config => {
    config.resolve.alias
      .set('Config', resolve('config')); // key,value自行定义，比如.set('@@', resolve('src/components'))
  },

  // 打包时不生成.map文件
  productionSourceMap: false,
};
