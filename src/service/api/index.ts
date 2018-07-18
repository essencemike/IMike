export default {
  global: [{
    name: 'userInfo',
    method: 'GET',
    desc: '测试服务',
    path: '/user/info/:a',
    mockPath: '/user/info/:a',
    query: ['a', 'b'],
    params: ['a', 'b'],
  }],
};
