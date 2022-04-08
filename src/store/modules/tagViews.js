import Cookies from "js-cookie";
const state = {
  /**全局路由元 title 信息 */
  metaTitle: [],
  routePath: [],
};
const mutations = {
  SETTITLE(state, data) {
    state.metaTitle.push({ title: data });
  },
  SETROUTEPATH(state, data) {
    state.routePath.push({ toPath: data });
  },    
};
const actions = {
  setTitle({ commit }) {
    const data = Cookies.get("metaTitle");
    commit("SETTITLE", data);
  },
  setRoutePath({ commit }) {
    console.log();
    const data = Cookies.get("routePath");
    commit("SETROUTEPATH", data);
  },
};

export default {
  state,
  mutations,
  actions,
};
