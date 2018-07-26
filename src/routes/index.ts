/**
 * 在这里配置路由信息
 * 路由中 meta 除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  title: '' i18n 国际化
 *  alwaysShow: (false) 设为true后，无论children有几个都显示父页面，设为false后，只有children大于1个的时候才显示父页面
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  href: '' 设置此链接后，点击将打开新的页面
 * }
 */
import Layout from '@/views/Layout/Layout.vue';

// 不作为 Layout 组件的子页面展示的页面单独写，如下：
export const login = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login/Login.vue'),
};

// 作为 Layout 组件的子页面展示
// 第一个要是 root 路由， 面包屑中用到
export const appRouter = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'home', icon: 'fa-home' },
      },
    ],
  },
  {
    path: '/adout',
    component: Layout,
    meta: {
      title: 'about',
      icon: 'fa-exclamation-circle',
    },
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/1',
        name: 'about1',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/2',
        name: 'about2',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/3',
        name: 'about3',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/4',
        name: 'about4',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/5',
        name: 'about5',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/6',
        name: 'about6',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/7',
        name: 'about7',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/8',
        name: 'about8',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
      {
        path: '/9',
        name: 'about9',
        component: () => import('@/views/About.vue'),
        meta: { title: 'about', icon: 'fa-exclamation-circle' },
      },
    ],
  },
];

export default [
  ...appRouter,
  // otherRouter,
  login,
];
