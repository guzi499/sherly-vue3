/**
 * @author 李浩宇
 * @date 2022/5/22
 */
import request from "@/utils/request";

// 获取租户列表
export function tenantListPage(params) {
  return request({
    url: "/tenant/list_page",
    method: "get",
    params,
  });
}

// 租户导出
export function tenantExport() {
  return request({
    url: "/tenant/list_export",
    method: "get",
    responseType: "blob",
  });
}

// 新增租户
export function tenantSaveOne(data) {
  return request({
    url: "/tenant/save_one",
    method: "post",
    data,
  });
}

// 删除租户
export function tenantRemoveOne(id) {
  return request({
    url: `/tenant/remove_one?tenantId=${id}`,
    method: "delete",
  });
}

// 更新租户
export function tenantUpdateOne(data) {
  return request({
    url: `/tenant/update_one`,
    method: "put",
    data,
  });
}

// 更新租户菜单
export function tenantUpdateMenu(data) {
  return request({
    url: `/tenant/update_menu`,
    method: "put",
    data,
  });
}

// 获取租户菜单权限
export function tenantListMenuId(tenantId) {
  return request({
    url: `/tenant/list_menu?tenantId=${tenantId}`,
    method: "get",
  });
}
