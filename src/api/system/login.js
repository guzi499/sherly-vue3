/**
 * @author 李浩宇
 * @date 2022/7/31
 */

import request from "@/utils/request";

// 登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

// 退出登录
export function logout() {
  return request({
    url: "/logout",
    method: "get",
  });
}

// 获取可用租户列表(不需要密码)
export function availableList(phone) {
  return request({
    url: `/available_list?phone=${phone}`,
    method: "get",
  });
}

// 获取可用租户列表(需要密码)
export function availableListCheck(data) {
  return request({
    url: "/available_list_check",
    method: "post",
    data,
  });
}

// 切换登录租户
export function loginChange(tenantCode) {
  return request({
    url: `/login_change?tenantCode=${tenantCode}`,
    method: "put",
  });
}
