/**
 * 在这里引入所有的 store modules
 */
import app from './modules/app';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import user from './modules/user';

export default {
  modules: {
    app,
    user,
    tagsView,
    permission,
  },
};
