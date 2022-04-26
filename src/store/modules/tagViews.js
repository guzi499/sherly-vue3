/*
 * @Author: lihaoyu
 * @Date: 2022-04-09 12:00:36
 * @LastEditTime: 2022-04-26 16:26:01
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/store/modules/tagViews.js
 */
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
    const data = Cookies.get("routePath");
    commit("SETROUTEPATH", data);
  },
};

export default {
  state,
  mutations,
  actions,
};
