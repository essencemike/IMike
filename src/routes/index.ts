/**
 * 这里配置所有的路由信息
 */
import Layout from '@/views/Layout/Layout.vue';

export const appRouter = [];

export const login = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login/Login.vue'),
};

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Layout,
  children: [
    { path: 'home', title: { i18n: 'home' }, name: 'home', component: () => import('@/views/Home.vue') },
    { path: 'about', title: { i18n: 'about' }, name: 'about', component: () => import('@/views/About.vue') },
  ],
};

export default [
  ...appRouter,
  otherRouter,
  login,
];
