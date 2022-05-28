/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:14:03
 * @LastEditTime: 2022-05-29 00:11:55
 * @LastEditors: lihaoyu
 * @Description: 请求封装
 * @FilePath: /sherly-vue3/src/utils/request.js
 */

import axios from "axios";
import Config from "@/config";
import { ElNotification } from "element-plus";
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
    // 在发送请求之前做些什么
    config.headers["Content-Type"] = config.responseType || "application/json";
    if (localStorage.getItem("token")) {
      config.headers["token"] = localStorage.getItem("token");
    }
    if (config.url === "/login") {
      config.headers["token"] = null;
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
    if (response.status === 200 && response.data.code === "000000") {
      return response.data.data;
    } else {
      ElNotification({
        title: "警告",
        message: response.data.message,
        duration: 3000,
        type: "error",
      });
      return Promise.reject({ message: response.data.message });
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.log(error);
    // ElNotification({
    //   title: "警告",
    //   message: "This is a message that does not automatically close",
    //   duration: 3000,
    //   type: "error",
    // });
    return Promise.reject(error);
  }
);
export default axiosInstance;
