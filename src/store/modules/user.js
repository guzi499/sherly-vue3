/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:49:00
 * @LastEditTime: 2022-03-30 00:37:09
 * @LastEditors: lihaoyu
 * @Description: 存储用户信息的vuex文件
 * @FilePath: /sherly-vue3/src/store/modules/user.js
 */
export default {
  state: () => ({
    userInfo: {},
  }),
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    loginSetUserInfo({ commit }, data) {
      commit("setUserInfo", data);
    },
  },
  getters: {},
};
