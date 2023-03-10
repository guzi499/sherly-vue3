/*
 * @author: 李浩宇
 * @date: 2022-04-09
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
  ADDROUTEPATH(state, data) {
    if (data.path !== "/home") state.routePath.push(data);
  },
  SETROUTEPATH(state, data) {
    state.routePath.length = 0;
    data.forEach((i) => {
      if (i.path !== "/home") state.routePath.push(i);
    });
  },
};
const actions = {
  setTitle({ commit }) {
    const data = Cookies.get("metaTitle");
    commit("SETTITLE", data);
  },

  addRoutePath({ commit, state: { routePath } }, currentRoute) {
    if (currentRoute) {
      if (
        routePath.filter(
          (i) =>
            currentRoute.fullPath.split("?")[0] === i.fullPath.split("?")[0]
        ).length === 0
      ) {
        if (currentRoute.fullPath === "/login") {
          return;
        } else {
          commit("ADDROUTEPATH", currentRoute);
        }
      }
    }
  },

  delRoutePath({ commit, state }, data) {
    return new Promise((resolve) => {
      const routePath = [...state.routePath];
      const index = routePath.findIndex((i) => i.path === data.path);
      if (data.bool) {
        routePath.splice(index, 1);
        commit("SETROUTEPATH", [...routePath]);
        resolve([...routePath]);
      } else {
        routePath.splice(index, 1);
        commit("SETROUTEPATH", [...routePath]);
      }
    });
  },

  UpdataRoutePath({ commit, state, dispatch }, data) {
    return new Promise((resolve) => {
      const routePath = [...state.routePath];
      const index = routePath.findIndex((i) => i.path === data.path);
      if (index > -1) {
        routePath[index] = data;
        commit("SETROUTEPATH", [...routePath]);
        resolve([...routePath]);
      } else {
        dispatch("addRoutePath", data);
      }
    });
  },
  delOtherRoutePath({ commit }, data) {
    return new Promise((resolve) => {
      const routePath = [data];
      commit("SETROUTEPATH", [...routePath]);
      resolve(routePath);
    });
  },
  delLeftRoutePath({ commit }, data) {
    return new Promise((resolve) => {
      const routePath = [...state.routePath];
      const index = routePath.findIndex((i) => i.path === data.path);
      commit("SETROUTEPATH", [...routePath].splice(index, routePath.length));
      resolve([...routePath].splice(index, routePath.length));
    });
  },
  delRightRoutePath({ commit }, data) {
    return new Promise((resolve) => {
      const routePath = [...state.routePath];
      const index = routePath.findIndex((i) => i.path === data.path);
      commit("SETROUTEPATH", [...routePath].splice(0, index + 1));
      resolve([...routePath].splice(0, index + 1));
    });
  },
  delAllRoutePath({ commit }) {
    return new Promise((resolve) => {
      commit("SETROUTEPATH", []);
      resolve([]);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
