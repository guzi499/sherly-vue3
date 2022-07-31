/*
 * @Author: lihaoyu
 * @Date: 2022-05-22 21:58:34
 * @LastEditTime: 2022-07-31 00:26:06
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/tenant.js
 */
import request from "@/utils/request";

/** 获取租户列表 */
export function getTenant(params) {
  return request({
    url: "/tenant/list_page",
    method: "get",
    params,
  });
}

/** 新增租户 */
export function addTenant(data) {
  return request({
    url: "/tenant/save_one",
    method: "post",
    data,
  });
}

/** 删除租户 */
export function delTenant(id) {
  return request({
    url: `/tenant/remove_one?tenantId=${id}`,
    method: "delete",
  });
}

/** 更新租户 */
export function updateTenant(data) {
  return request({
    url: `/tenant/update_one`,
    method: "put",
    data,
  });
}

/** 更新租户菜单 */
export function updateTenantMenu(data) {
  return request({
    url: `/tenant/update_menu`,
    method: "put",
    data,
  });
}

/** 获取租户菜单权限 */
export function getTenantListMenu(tenantId) {
  return request({
    url: "/tenant/list_menu?tenantId=" + tenantId,
    method: "get",
  });
}
