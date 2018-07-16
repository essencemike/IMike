import axios from './axios';
import api from './api';

export default {
  install(Vue: any, options: any) {
    Vue.prototype.$_app_api = api;
    Vue.prototype.$_app_axios = axios;

    // 需要挂载的都可以放在这里
  },
};
