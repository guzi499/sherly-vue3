/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 00:42:42
 * @LastEditTime: 2022-04-09 12:03:28
 * @LastEditors: lihaoyu
 * @Description: 登录页api
 * @FilePath: /sherly-vue3/src/api/login.js
 */

import request from "@/utils/request";

export default {
  login(data) {
    return request({
      url: "/login",
      method: "post",
      data,
    });
  },
  logout() {
    return request({
      url: "/logout",
      method: "get",
    });
  },
};
