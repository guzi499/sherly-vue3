/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 00:42:42
 * @LastEditTime: 2022-07-24 17:44:47
 * @LastEditors: lihaoyu
 * @Description: 登录页api
 * @FilePath: /sherly-vue3/src/api/system/login.js
 */

import request from "@/utils/request";

//** 登录 */
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

//** 退出登录 */
export function logout() {
  return request({
    url: "/logout",
    method: "get",
  });
}
