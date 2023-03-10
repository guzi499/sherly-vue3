/*
 * @author: 李浩宇
 * @date: 2022-03-29
 */

import axios from "axios";
import Config from "@/config";
import { ElNotification, ElMessageBox } from "element-plus";
import { pickBy, identity, trim } from "lodash";
import router from "@/router/router";
import Cookies from "js-cookie";
import store from "@/store";

const axiosInstance = axios.create({
  timeout: Config.timeout,
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_URL + "/api"
      : "/api",
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = config.responseType || "application/json";

    // 标头设置token
    if (localStorage.getItem("token")) {
      config.headers["token"] = localStorage.getItem("token");
    }

    // 登录请求不应该设置token
    if (config.url === "/login") {
      config.headers["token"] = null;
    }
    // get请求需要将params中blank的属性删除
    if (config.method === "get" && config.params) {
      Object.keys(config.params).forEach((i) => {
        config.params[i] = trim(config.params[i]);
      }),
        (config.params = pickBy(config.params, identity));
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    ElNotification({
      title: "错误",
      message: "This is a message that does not automatically close",
      duration: 3000,
      type: "error",
    });
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200 && response.data.code === "000") {
      return response.data.data;
    } else if (
      response.status === 200 &&
      response.config.responseType === "blob"
    ) {
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      // onload当读取操作成功完成时调用
      reader.onload = function (e) {
        var a = document.createElement("a");
        // 获取文件名fileName
        var fileName =
          response.headers["content-disposition"].split("''")[
            response.headers["content-disposition"].split("''").length - 1
          ];
        fileName = decodeURI(fileName);
        fileName = fileName.replace(/"/g, "");
        a.download = fileName;
        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      return response.data;
    } else if (response.data.code === "401") {
      if (response.request.responseURL.indexOf("/generic/basic_data") > -1) {
        ElNotification({
          title: "警告",
          message: "登录授权过期",
          duration: 3000,
          type: "error",
        });
        remake();
      } else if (
        response.request.responseURL.indexOf("/generic/heart_beat") === -1
      ) {
        ElMessageBox.alert("登录授权过期,是否跳转登录页？", "提示", {
          showCancelButton: true,
          confirmButtonText: "跳转登录页",
          cancelButtonText: "留在当前页",
          callback: (action) => {
            console.log(action);
            if (action === "confirm") {
              remake();
            }
          },
        });
      }
    } else {
      ElNotification({
        title: "警告",
        message: response.data.message,
        duration: 3000,
        type: "error",
      });
      return Promise.reject(response.data);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
const remake = () => {
  Cookies.remove("phone");
  Cookies.remove("metaTitle");
  Cookies.remove("userInfo");
  Cookies.remove("routePath");
  Cookies.remove("password");
  localStorage.removeItem("token");
  store.dispatch("router/loadMenus", true);
  router.replace("/login");
  location.reload();
};
export default axiosInstance;
