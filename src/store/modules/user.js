/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:49:00
 * @LastEditTime: 2022-04-14 23:33:36
 * @LastEditors: lihaoyu
 * @Description: 存储用户信息的vuex文件
 * @FilePath: /sherly-vue3/src/store/modules/user.js
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
