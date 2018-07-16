import Vue from 'vue';

// 引入所有的公共组件
import '@/components';

// 引入所有的公共指令
import '@/directives';

// 引入插件
// import router from '@/plugins/router';
import store from '@/plugins/store';
import inject from '@/plugins/inject';

// 引入第三方组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(inject);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
