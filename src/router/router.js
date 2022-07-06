/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 23:33:28
 * @LastEditTime: 2022-06-12 20:02:27
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/router/router.js
 */
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/login/loginPage.vue";
import Layout from "@/layout/layoutBox.vue";
import Home from "@/pages/system/homePage.vue";
import Personal from "@/pages/system/personal/selfPage"

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
    hidden: false,
    // meta: {title: "首页"},
    children: [
      {
        path: "/home",
        component: Home,
        meta: {title: "首页"},
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/personal",
        component: Personal,
        meta: {title: "个人中心"},
      },
    ],
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
