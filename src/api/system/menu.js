/**
 * @author 李浩宇
 * @date 2022/4/21
 */

import request from "@/utils/request";

// 菜单列表
export function menuListTree(data) {
  return request({
    url: "/menu/list_tree",
    method: "get",
    data,
  });
}

// 新增菜单
export function menuSaveOne(data) {
  return request({
    url: "/menu/save_one",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function menuUpdateOne(data) {
  return request({
    url: "/menu/update_one",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function menuRemoveOne(menuId) {
  return request({
    url: `/menu/remove_one?menuId=${menuId}`,
    method: "delete",
  });
}
