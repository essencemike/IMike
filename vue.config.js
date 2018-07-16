module.exports = {
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0]['process.env']['BASE_URL'] = '/blog/';
        }
        return args;
      });
  },
};
