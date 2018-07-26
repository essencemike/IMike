import Vue from 'vue';

// 引入第三方组件库
import * as ElementUI from 'element-ui';

// 引入样式
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';

// 引入所有的公共组件
import '@/components';

// 引入所有的公共指令
import '@/directives';

// 引入所有的公共过滤器
import '@/filters';

// 引入插件
import router from '@/plugins/router';
import store from '@/plugins/store';
import inject from '@/plugins/inject';

import i18n from '@/locale';

import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(inject);
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key: string, value: string) => i18n.t(key, value),
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
