/*
 * @Author: lihaoyu
 * @Date: 2022-04-01 22:38:20
 * @LastEditTime: 2022-04-09 12:48:53
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/router/index.js
 */
import router from "./router";
import { ElNotification } from "element-plus";
import Cookies from "js-cookie";
import Config from "@/config";
import store from "@/store";
import server from "@/api/router";
import Layout from "@/layout/layoutBox.vue";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - " + Config.systemName;
    document.path = to.path;
    Cookies.set("metaTitle", document.title);
    Cookies.set("routePath", document.path);
    store.dispatch("setTitle");
    store.dispatch("setRoutePath");
  }
  //登录页面时不加载动态菜单
  if (to.meta.href !== "/login") {
    if (store.state.router.isUpdata) {
      loadRouter(to, next);
    } else {
      next();
    }
  } else {
    next();
  }
});

const loadRouter = (to, next) => {
  return server.getMenu().then((res) => {
    const MenuList = res;
    console.log('获取菜单信息', MenuList);
    addRoute(formatRouter(MenuList));
    // 判断去跳转的路由是否注册
    if (!router.getRoutes().find((i) => i.path === to.path)) {
      ElNotification({
        title: "警告",
        message: "当前跳转页面不存在，请联系服务商。",
        duration: 3000,
        type: "error",
      });
      next("/login");
    } else {
      next({ ...to, replace: true });
    }
    store.dispatch("router/loadMenus", false);
    store.dispatch("router/setMenuList", MenuList);
  });
};

const formatRouter = (MenuList) => {
  const _router = [];
  MenuList.forEach((i) => {
    _router.push({
      path: i.link,
      // component: () =>
      //   require.ensure([], (require) => require(`@/pages${i.link}Page`)),
      component: Layout,
      meta: { title: i.menuName },
      children: filterchildren(i.children, i),
    });
  });
  return _router;
};
const filterchildren = (children, currentMenu) => {
  const _children = [];
  children.forEach((i) => {
    _children.push({
      path: i.link,
      component: () =>
        require.ensure([], (require) =>
          require(`@/pages${currentMenu.link}${i.link}Page`)
        ),
      meta: { title: i.menuName },
      children: filterchildren(i.children, i),
    });
  });
  return _children;
};
const addRoute = (formatRouter) => {
  console.log(formatRouter);
  formatRouter.forEach((i) => {
    router.addRoute(i);
  });
  console.log(router.getRoutes());
};
