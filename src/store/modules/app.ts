import Cookies from 'js-cookie';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as TYPES from '@/constants';

export interface AppState {
  sidebar: any;
  language: string;
}

const opened = !Number(Cookies.get('sidebarStatus'));

const appState: AppState = {
  sidebar: {
    opened,
  },
  language: Cookies.get('language') || 'zh',
};

const getters: GetterTree<AppState, any> = {
  sidebar: (state) => state.sidebar,
  language: (state) => state.language,
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

  [TYPES.SET_LANGUAGE](state, language) {
    state.language = language;
    Cookies.set('language', language);
  },
};

const actions: ActionTree<AppState, any> = {
  [TYPES.TOGGLE_SIDEBAR]({ commit }) {
    commit(TYPES.TOGGLE_SIDEBAR);
  },

  [TYPES.SET_LANGUAGE]({ commit }, language) {
    commit(TYPES.SET_LANGUAGE, language);
  },
};

export default {
  state: appState,
  mutations,
  actions,
  getters,
};
