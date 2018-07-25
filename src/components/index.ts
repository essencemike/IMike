import Vue from 'vue';

/**
 * components 组件的文件目录格式
 * ComponentName
 *  - index.vue
 * 组件目录以及文件全部以 PascalCase 格式命名
 * 所有公共组件统一在此处引入注册
 */
Vue.component('HelloWorld', () => import('@/components/HelloWorld/index.vue'));
Vue.component('EuiEditor', () => import('@/components/EuiEditor/index.vue'));
Vue.component('EuiHamburger', () => import('@/components/EuiHamburger/index.vue'));
Vue.component('EuiBreadcrumb', () => import('@/components/EuiBreadcrumb/index.vue'));
Vue.component('EuiScreenfull', () => import('@/components/EuiScreenfull/index.vue'));
Vue.component('EuiLangSelect', () => import('@/components/EuiLangSelect/index.vue'));
Vue.component('EuiScrollPane', () => import('@/components/EuiScrollPane/index.vue'));
Vue.component('EuiTag', () => import('@/components/EuiTag/index.vue'));
