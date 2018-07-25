import Cookies from 'js-cookie';
import { RouteConfig } from 'vue-router';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as TYPES from '@/constants';

interface AppState {
  sidebar: any;
  visitedViews: RouteConfig[];
}

const opened = !Number(Cookies.get('sidebarStatus'));

const appState: AppState = {
  sidebar: {
    opened,
  },
  visitedViews: [],
};

const getters: GetterTree<AppState, any> = {
  sidebar: (state) => state.sidebar,
  visitedViews: (state) => state.visitedViews,
};

const mutations: MutationTree<AppState> = {
  [TYPES.TOGGLE_SIDEBAR](state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
    state.sidebar.opened = !state.sidebar.opened;
  },
  [TYPES.ADD_VISITED_VIEWS](state: AppState, view: RouteConfig) {
    if (state.visitedViews.some((v) => v.path === view.path)) return;

    state.visitedViews.push(view);
  },
  [TYPES.DEL_VISITED_VIEWS](state: AppState, view: RouteConfig) {
    const index = state.visitedViews.findIndex((v) => v.path === view.path);
    state.visitedViews.splice(index, 1);
  },
};

const actions: ActionTree<AppState, any> = {
  [TYPES.TOGGLE_SIDEBAR]({ commit }) {
    commit(TYPES.TOGGLE_SIDEBAR);
  },

  [TYPES.ADD_VISITED_VIEWS]({ commit }, view) {
    commit(TYPES.ADD_VISITED_VIEWS, view);
  },

  [TYPES.DEL_VISITED_VIEWS]({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TYPES.DEL_VISITED_VIEWS, view);
      resolve([...state.visitedViews]);
    });
  },
};

export default {
  state: appState,
  mutations,
  actions,
  getters,
};
