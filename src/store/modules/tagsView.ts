import { RouteConfig } from 'vue-router';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as TYPES from '@/constants';
import { appRouter } from '@/routes';

const home = (appRouter[0].children || [])[0];

export interface TagsViewState {
  visitedViews: RouteConfig[];
}

const tagsViewState: TagsViewState = {
  visitedViews: [home],
};

const getters: GetterTree<TagsViewState, any> = {
  visitedViews: (state) => state.visitedViews,
};

const mutations: MutationTree<TagsViewState> = {
  [TYPES.ADD_VISITED_VIEWS](state: TagsViewState, view: RouteConfig) {
    if (state.visitedViews.some((v) => v.path === view.path)) return;

    state.visitedViews.push(view);
  },

  [TYPES.DEL_VISITED_VIEWS](state: TagsViewState, view: RouteConfig) {
    const index = state.visitedViews.findIndex((v) => v.path === view.path);
    state.visitedViews.splice(index, 1);
  },

  [TYPES.CLEAR_OTHERS_VIEWS](state: TagsViewState, view: RouteConfig) {
    state.visitedViews = [home, view];
  },

  [TYPES.CLEAR_ALL_VIEWS](state: TagsViewState) {
    state.visitedViews = [home];
  },
};

const actions: ActionTree<TagsViewState, any> = {
  [TYPES.ADD_VISITED_VIEWS]({ commit }, view) {
    commit(TYPES.ADD_VISITED_VIEWS, view);
  },

  [TYPES.CLEAR_OTHERS_VIEWS]({ commit }, view) {
    return new Promise((resolve) => {
      commit(TYPES.CLEAR_OTHERS_VIEWS, view);
      resolve();
    });
  },

  [TYPES.CLEAR_ALL_VIEWS]({ commit }) {
    return new Promise((resolve) => {
      commit(TYPES.CLEAR_ALL_VIEWS);
      resolve();
    });
  },

  [TYPES.DEL_VISITED_VIEWS]({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TYPES.DEL_VISITED_VIEWS, view);
      resolve([...state.visitedViews]);
    });
  },
};

export default {
  state: tagsViewState,
  mutations,
  actions,
  getters,
};
