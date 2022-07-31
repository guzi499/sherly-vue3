/*
 * @Author: lihaoyu
 * @Date: 2022-03-30 00:42:42
 * @LastEditTime: 2022-07-31 19:58:24
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

//** 获取可用租户列表(不需要密码) */
export function getAvailablelist(phone) {
  return request({
    url: "/available_list?phone=" + phone,
    method: "get",
  });
}

//** 获取可用租户列表(需要密码) */
export function getAvailablelistCheck(data) {
  return request({
    url: "/available_list_check",
    method: "post",
    data,
  });
}

//** 切换登录租户 */
export function loginchange(tenantCode) {
  return request({
    url: "/login_change?tenantCode=" + tenantCode,
    method: "put",
  });
}
