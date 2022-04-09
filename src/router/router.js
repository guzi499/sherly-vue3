/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 23:33:28
 * @LastEditTime: 2022-04-09 12:03:26
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/router/router.js
 */
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/login/loginPage.vue";
import Layout from "@/layout/layoutBox.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: Login,
    meta: { title: "登录" },
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "登录" },
  },
  {
    path: "/home",
    component: Layout,
    meta: { title: "首页" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
