/*
 * @Author: lihaoyu
 * @Date: 2022-04-18 09:52:49
 * @LastEditTime: 2022-06-08 23:26:27
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/user.js
 */
import request from "@/utils/request";

/**获取用户详情 */
export function getUserId(userId) {
  return request({
    url: "/user/get/one?userId=" + userId,
    method: "get",
  });
}

/**用户新增 */
export function addUser(data) {
  return request({
    url: "/user/save/one",
    method: "post",
    data: data,
  });
}

/**用户更新 */
export function updataUser(data) {
  return request({
    url: "/user/update/one",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function delMenu(userId) {
  return request({
    url: "/user/remove/one?userId=" + userId,
    method: "delete",
  });
}

/**用户禁用 - 解禁 */
export function disableUser(data) {
  return request({
    url: "/user/ban/one",
    method: "put",
    data: data,
  });
}

/**用户分页 */
export function pageUser(data) {
  return request({
    url: "/user/list/page",
    method: "get",
    data: data,
  });
}

/**用户导出 */
export function exportUser() {
  return request({
    url: "/user/list/export",
    method: "get",
    responseType: "blob",
  });
}
