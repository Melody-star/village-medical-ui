import { TOKEN_NAME } from '@/config/global';
import proxy from '@/config/host';
import axios from 'axios';

const env = import.meta.env.MODE || 'development';

const API_HOST = env === 'mock' ? '/' : proxy[env].API;

const InitUserInfo = {
  roles: [],
};

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
  userInfo: InitUserInfo,
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_NAME);
    state.token = '';
  },
  setUserInfo(state, userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    state.userInfo = userInfo;
  },
};

const getters = {
  token: (state) => state.token,
  roles: (state) => state.userInfo?.roles,
};

const actions = {
  async login({ commit }, userInfo) {
    const { account, password } = userInfo;
    const res = await axios.post(API_HOST + '/auth/login', {
      username: account,
      password,
    });
    if (res.status === 201) {
      commit('setToken', res.data.data.authorization);
    } else {
      throw res;
    }
  },
  async getUserInfo({ commit, state }) {
    const res = await axios.get(API_HOST + '/auth/findUserByToken?token=' + state.token);
    commit('setUserInfo', res.data.data);
  },
  async logout({ commit }) {
    commit('removeToken');
    commit('setUserInfo', InitUserInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
