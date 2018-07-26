import { RouteConfig } from 'vue-router';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as TYPES from '@/constants';
import { appRouter } from '@/routes';

export interface PermissionState {
  routes: RouteConfig[];
  addRouters: RouteConfig[];
}

const permissinState: PermissionState = {
  routes: appRouter,
  addRouters: [],
};

const getters: GetterTree<PermissionState, any> = {
  routes: (state) => state.routes,
  addRouters: (state) => state.addRouters,
};

const mutations: MutationTree<PermissionState> = {
  [TYPES.SET_ROUTERS](state, routes) {
    state.addRouters = routes;
    state.routes = appRouter.concat(routes);
  },
};

const actions: ActionTree<PermissionState, any> = {
  [TYPES.GENERATE_ROUTES]({ commit }, data) {
    return new Promise((resolve) => {
      // TODO 生成有权限的 route
      commit(TYPES.SET_ROUTERS, data);
      resolve();
    });
  },
};

export default {
  state: permissinState,
  mutations,
  actions,
  getters,
};
