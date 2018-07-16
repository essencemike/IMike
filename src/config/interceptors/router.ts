/**
 * 全局的路由拦截配置
 */
export function routerBeforeEachFn(to: any, form: any, next: any) {
  // 这里可以做页面拦截， 也可以做权限处理
  // checkPermission(to, form);
  next();
}
