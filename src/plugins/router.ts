import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/routes';
import { ROUTER_DEFAULT_CONFIG, routerBeforeEachFn } from '@/config';

Vue.use(Router);

// 注入默认配置和路由表
const routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes,
});

// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFn);

export default routerInstance;
