import axios from './axios';
import api from './api';

export default {
  install(Vue: any, options: any) {
    Object.defineProperty(Vue.prototype, '$_app_api', {
      get() { return api; },
    });

    Object.defineProperty(Vue.prototype, '$_app_axios', {
      get() { return axios; },
    });

    // 需要挂载的都可以放在这里
  },
};
