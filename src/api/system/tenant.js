/*
 * @Author: lihaoyu
 * @Date: 2022-05-22 21:58:34
 * @LastEditTime: 2022-05-23 00:11:39
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/tenant.js
 */
import request from "@/utils/request";

/**获取租户列表 */
export function getTenant(params) {
  return request({
    url: "/tenant/list/page",
    method: "get",
    params,
  });
}

/**新增租户 */
export function addTenant(data) {
  return request({
    url: "/tenant/save/one",
    method: "post",
    data,
  });
}

/**删除租户 */
export function delTenant(id) {
  return request({
    url: `/tenant/remove/one?id=${id}`,
    method: "delete",
  });
}

/**更新租户 */
export function updateTenant(data) {
  return request({
    url: `/tenant/update/one`,
    method: "put",
    data,
  });
}
