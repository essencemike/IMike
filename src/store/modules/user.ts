import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as TYPES from '@/constants';

export interface UserState {
  userName: string;
  avator: string;
  token: string;
  access: string | string[];
}

const userState: UserState = {
  userName: '',
  avator: '',
  token: '',
  access: '',
};

const getters: GetterTree<UserState, any> = {
  userName: (state) => state.userName,
  avator: (state) => state.avator,
  token: (state) => state.token,
  access: (state) => state.access,
};

const mutations: MutationTree<UserState> = {
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
  },

  [TYPES.SET_NAME](state, name) {
    state.userName = name;
  },

  [TYPES.SET_AVATAR](state, avator) {
    state.avator = avator;
  },

  [TYPES.SET_ROLES](state, roles) {
    state.access = roles;
  },
};

const actions: ActionTree<UserState, any> = {
  // 用户登录
  [TYPES.LOGIN_BY_USER_NAME]({ commit }, userInfo) {
  },

  // 获取用户信息
  [TYPES.GET_USER_INFO]({ commit, state }) {
  },

  // 登出
  [TYPES.LOGOUT]({ commit, state }) {
  },

  // 前端登出
  [TYPES.FED_LOGOUT]({ commit }) {
  },

  // 动态修改权限
  [TYPES.CHANGE_ROLE]({ commit }, role) {
  },
};

export default {
  state: userState,
  mutations,
  actions,
  getters,
};
