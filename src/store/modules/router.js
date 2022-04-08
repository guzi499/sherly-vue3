/*
 * @Author: lihaoyu
 * @Date: 2022-04-07 23:23:58
 * @LastEditTime: 2022-04-08 00:22:02
 * @LastEditors: lihaoyu
 * @Description: 存储路由信息的vuex文件
 * @FilePath: /sherly-vue3/src/store/modules/router.js
 */
export default {
  namespaced: true,
  state: () => ({
    menuList: [],
  }),
  mutations: {
    SETMENTLIST(state, data) {
      state.menuList = data;
    },
  },
  actions: {
    setMenuList({ commit }, data) {
      commit("SETMENTLIST", data);
    },
  },
  getters: {},
};
