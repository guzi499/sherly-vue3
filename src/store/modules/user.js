/*
 * @Author: lihaoyu
 * @Date: 2022-04-09 12:00:59
 * @LastEditTime: 2022-08-04 00:41:53
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/store/modules/user.js
 */
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
