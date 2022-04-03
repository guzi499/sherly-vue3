/*
 * @Author: lihaoyu
 * @Date: 2022-04-01 22:38:20
 * @LastEditTime: 2022-04-02 00:31:34
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/router/index.js
 */
import router from "./router";
import { ElNotification } from "element-plus";
import Cookies from "js-cookie";
import store from "@/store";

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.title) {
    document.title = to.meta.title;
    document.path = to.path;
    Cookies.set('metaTitle', document.title)
    Cookies.set('routePath', document.path)
    store.dispatch('setTitle')
    store.dispatch('setRoutePath')
  }
  if (to.matched.length === 0) {
    ElNotification({
      title: "警告",
      message: "当前跳转页面不存在，请联系服务商。",
      duration: 3000,
      type: "error",
    });
    from.path ? next({ path: from.path }) : next("/");
  } else {
    next();
  }
  // ...
  // 返回 false 以取消导航
});
