/*
 * @Author: lihaoyu
 * @Date: 2022-04-01 22:38:20
 * @LastEditTime: 2022-04-09 12:04:42
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
  //登录页面时不加载动态菜单
  if (to.meta.href !== "/login") {
    if (store.state.router.isUpdata) {
      loadRouter();
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title + " - " + Config.systemName;
    document.path = to.path;
    Cookies.set("metaTitle", document.title);
    Cookies.set("routePath", document.path);
    store.dispatch("setTitle");
    store.dispatch("setRoutePath");
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
});

const loadRouter = () => {
  server.getMenu().then((res) => {
    const MenuList = res;
    console.log('获取菜单信息', MenuList);
    addRoute(formatRouter(MenuList));
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
    console.log("i", i);
    router.addRoute(i);
  });
  console.log(router.getRoutes());
};
