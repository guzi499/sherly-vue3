/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:14:03
 * @LastEditTime: 2022-04-02 00:28:50
 * @LastEditors: lihaoyu
 * @Description: 请求封装
 * @FilePath: /sherly-vue3/src/utils/request.js
 */

import axios from "axios";
import Config from "@/config";
import { ElNotification } from "element-plus";

const axiosLnstance = axios.create({
  timeout: Config.timeout,
});

// 添加请求拦截器
axiosLnstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers["Content-Type"] = "application/json";
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
axiosLnstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200 && response.data.code === "000000") {
      return response.data;
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
export default axiosLnstance;
