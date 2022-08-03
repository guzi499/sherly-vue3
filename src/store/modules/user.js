/*
 * @author: 李浩宇
 * @date: 2022-03-29
 */

export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
    api: "",
  }),
  mutations: {
    STEUSERINFO(state, data) {
      state.userInfo = data;
    },
    STEAPI(state, data) {
      state.api = data;
    },
  },
  actions: {
    setUserInfo({ commit }, data) {
      commit("STEUSERINFO", data);
    },
    setApi({ commit }, data) {
      commit("STEAPI", data);
    },
  },
  getters: {},
};
