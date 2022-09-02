/*
 * @author: 李浩宇
 * @date: 2022-04-01
 */
import router from "./router";
import { ElNotification } from "element-plus";
import Cookies from "js-cookie";
import Config from "@/config";
import store from "@/store";
import { genericBasicData } from "@/api/system/generic";
import Layout from "@/layout/layoutBox.vue";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    const userInfo = store.state.user.userInfo;
    const tenantName = userInfo.basicUserInfoVO
      ? "-" + userInfo.basicUserInfoVO.tenantName
      : "";
    const systemName = Config.systemName ? Config.systemName : "";
    document.title = to.meta.title + tenantName + systemName;
    const data = to.meta.title + " - " + to.path;
    Cookies.set("metaTitle", data);
    store.dispatch("setTitle");
  }

  //登录页面时不加载动态菜单
  if (to.href !== "/login") {
    if (!localStorage.getItem("token")) {
      next("/");
      return;
    }
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
  return genericBasicData({ token: localStorage.getItem("token") }).then((res) => {
    if (res) {
      store.dispatch("user/setUserInfo", res);
      const MenuList = res.basicMenuInfoVO;
      const userInfo = res.basicUserInfoVO;
      // 存储登录用户的真实名称
      Cookies.set("userInfo", JSON.stringify(userInfo));
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
    }
  });
};

const formatRouter = (MenuList) => {
  const _router = [];
  MenuList.forEach((i) => {
    _router.push({
      path: i.link || "",
      component: Layout,
      meta: { title: i.menuName },
      children: filterChildren(i.children, i),
    });
  });
  return _router;
};
const filterChildren = (children) => {
  let _children = [];
  children.forEach((i) => {
    if (i.link) {
      _children.push({
        path: i.link,
        component: () =>
          require.ensure([], (require) => require(`@/pages/${i.link}Page`)),
        meta: { title: i.menuName },
      });
    } else {
      _children = _children.concat(filterChildren(i.children));
    }
  });
  return _children;
};
const addRoute = (formatRouter) => {
  formatRouter.forEach((i) => {
    router.addRoute(i);
  });
  console.log(router.getRoutes());
};
