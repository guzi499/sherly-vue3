/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 00:42:42
 * @LastEditTime: 2022-04-01 22:01:26
 * @LastEditors: lihaoyu
 * @Description: 登陆页api
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
  getSetting(data) {
    return request({
      url: "/seting",
      method: "post",
      data,
    });
  },
};
