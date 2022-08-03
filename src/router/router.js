/*
 * @author: 李浩宇
 * @date: 2022-03-30
 */
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/system/login/indexPage.vue";
import Layout from "@/layout/layoutBox.vue";
import Home from "@/pages/system/home/indexPage.vue";
import Personal from "@/pages/system/user_self/indexPage.vue";

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
        meta: { title: "首页" },
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
        meta: { title: "个人中心" },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
