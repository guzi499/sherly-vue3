import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

import Home from "../components/blank.vue";
import About from "../components/about.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: 'home',
    },
    component: Home,
  },
  {
    path: '/about',
    meta: {
      title: 'about',
    },
    component: About,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
