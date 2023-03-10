/*
 * @author: 李浩宇
 * @date: 2022-03-29
 */

import { createStore, createLogger } from "vuex";
import user from "./modules/user";
import tagViews from "./modules/tagViews";
import router from "./modules/router";

const debug = process.env.NODE_ENV !== "production";
export default createStore({
  modules: {
    user,
    tagViews,
    router,
  },
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  strict: debug,
  // 在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。
  plugins: debug ? [createLogger()] : [],
});
