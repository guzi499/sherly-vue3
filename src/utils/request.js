/*
 * @Author: lihaoyu
 * @Date: 2022-03-29 22:14:03
 * @LastEditTime: 2022-07-24 18:03:12
 * @LastEditors: lihaoyu
 * @Description: 请求封装
 * @FilePath: /sherly-vue3/src/utils/request.js
 */

import axios from "axios";
import Config from "@/config";
import { ElNotification } from "element-plus";
// import { heartBzeat } from "@/api/system/generic";

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
