/*
 * @Author: lihaoyu
 * @Date: 2022-04-20 11:01:33
 * @LastEditTime: 2022-04-24 23:08:08
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/role.js
 */

import request from "@/utils/request";

/**获取角色列表 */
export function getRoleLists(params) {
  return request({
    url: "/role/list_page",
    method: "get",
    params,
  });
}

/**获取角色详情 */
export function getOneRole(roleId) {
  return request({
    url: `/role/get_one?roleId=${roleId}`,
    method: "get",
  });
}

/**新增角色 */
export function addRole(data) {
  return request({
    url: "/role/save_one",
    method: "post",
    data,
  });
}

/**删除角色 */
export function delRole(roleId) {
  return request({
    url: `/role/remove_one?roleId=${roleId}`,
    method: "delete",
  });
}

/**更新角色 */
export function updateRole(data) {
  return request({
    url: `/role/update_one`,
    method: "put",
    data,
  });
}

/**获取角色查询 */
export function listAll(params) {
  return request({
    url: "/role/list_all",
    method: "get",
    params,
  });
}
