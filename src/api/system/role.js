/**
 * @author 李浩宇
 * @date 2022/4/20
 */

import request from "@/utils/request";

// 获取角色列表
export function roleListPage(params) {
  return request({
    url: "/role/list_page",
    method: "get",
    params,
  });
}

// 获取角色详情
export function roleGetOne(roleId) {
  return request({
    url: `/role/get_one?roleId=${roleId}`,
    method: "get",
  });
}

// 新增角色
export function roleSaveOne(data) {
  return request({
    url: "/role/save_one",
    method: "post",
    data,
  });
}

// 删除角色
export function roleRemoveOne(roleId) {
  return request({
    url: `/role/remove_one?roleId=${roleId}`,
    method: "delete",
  });
}

// 更新角色
export function roleUpdateOne(data) {
  return request({
    url: `/role/update_one`,
    method: "put",
    data,
  });
}

// 获取角色查询
export function roleListAll(params) {
  return request({
    url: "/role/list_all",
    method: "get",
    data: params,
  });
}
