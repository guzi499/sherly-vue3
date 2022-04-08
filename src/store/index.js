/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:48:43
 * @LastEditTime: 2022-04-07 23:59:46
 * @LastEditors: lihaoyu
 * @Description: 集合modules下所有的文件
 * @FilePath: /sherly-vue3/src/store/index.js
 */
import { createStore, createLogger } from "vuex";
import user from "./modules/user";
import router from "./modules/router";
import Cookies from "js-cookie";

const debug = process.env.NODE_ENV !== "production";
export default createStore({
  state() {
    return {
      /**全局路由元 title 信息 */
      metaTitle: "",
      routePath: "",
    };
  },
  mutations: {
    SETTITLE(state, data) {
      state.metaTitle = data;
    },
    SETROUTEPATH(state, data) {
      state.routePath = data;
    },
  },
  actions: {
    setTitle({ commit }) {
      const data = Cookies.get("metaTitle");
      console.log(data);
      commit("SETTITLE", data);
    },
    setRoutePath({ commit }) {
      console.log();
      const data = Cookies.get("routePath");
      commit("SETROUTEPATH", data);
    },
  },
  modules: {
    user,
    router,
  },
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  strict: debug,
  // 在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。
  plugins: debug ? [createLogger()] : [],
});
