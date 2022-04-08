/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:49:00
 * @LastEditTime: 2022-04-08 00:19:09
 * @LastEditors: lihaoyu
 * @Description: 存储用户信息的vuex文件
 * @FilePath: /sherly-vue3/src/store/modules/user.js
 */
export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
  }),
  mutations: {
    STEUSERINFO(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    setUserInfo({ commit }, data) {
      commit("STEUSERINFO", data);
    },
  },
  getters: {},
};
