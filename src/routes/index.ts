/**
 * 这里配置所有的路由信息
 */
import Layout from '@/views/Layout/Layout.vue';

// 不作为 Layout 组件的子页面展示的页面单独写，如下：
export const login = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login/Login.vue'),
};

// 作为 Layout 组件的子页面展示并且在左侧菜单显示的路由写在 appRouter 里
export const appRouter = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'home', icon: 'fa-home' },
      },
    ],
  },
  {
    path: '/adout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
    ],
  },
];

// 作为 Layout 组件的子页面展示但是不在左侧菜单显示的路由写在 otherRouter 里
export const otherRouter = {};

export default [
  ...appRouter,
  // otherRouter,
  login,
];
