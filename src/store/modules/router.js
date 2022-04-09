/*
 * @Author: lihaoyu
 * @Date: 2022-04-07 23:23:58
 * @LastEditTime: 2022-04-09 02:22:25
 * @LastEditors: lihaoyu
 * @Description: 存储路由信息的vuex文件
 * @FilePath: /sherly-vue3/src/store/modules/router.js
 */
export default {
  namespaced: true,
  state: () => ({
    menuList: [],
    isUpdata: true,
  }),
  mutations: {
    SETMENTLIST(state, data) {
      state.menuList = data;
    },
    LOADMENUS(state, data) {
      state.isUpdata = data;
    },
  },
  actions: {
    setMenuList({ commit }, data) {
      commit("SETMENTLIST", data);
    },
    loadMenus({ commit }, data) {
      commit("LOADMENUS", data);
    },
  },
  getters: {},
};
