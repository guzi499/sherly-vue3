/*
 * @author: 李浩宇
 * @date: 2022-04-07
 */

export default {
  namespaced: true,
  state: () => ({
    menuList: [],
    menuNames: [],
    isUpdata: true,
  }),
  mutations: {
    SETMENTLIST(state, data) {
      state.menuList = data;
    },
    LOADMENUS(state, data) {
      state.isUpdata = data;
    },
    MENUNAMES(state, data) {
      state.menuNames = data;
    },
  },
  actions: {
    setMenuList({ commit }, data) {
      commit("SETMENTLIST", data);
    },
    loadMenus({ commit }, data) {
      commit("LOADMENUS", data);
    },
    setMenuNames({ commit }, data) {
      console.log(data)
      commit("MENUNAMES", data);
    },
  },
  getters: {},
};
