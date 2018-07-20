/**
 * 全局的路由拦截配置
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export function routerBeforeEachFn(to: any, form: any, next: any) {
  // 这里可以做页面拦截， 也可以做权限处理
  // checkPermission(to, form);
  // 显示进度条
  NProgress.start();
  next();
}

export function routerAfterEachFn(to: any, form: any) {
  NProgress.done();
}
