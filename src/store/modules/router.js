/*
 * @author: 李浩宇
 * @date: 2022-04-07
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
