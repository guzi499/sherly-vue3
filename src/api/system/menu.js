/*
 * @Author: lihaoyu
 * @Date: 2022-04-21 22:50:32
 * @LastEditTime: 2022-05-06 21:43:14
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/menu.js
 */
import request from "@/utils/request";

/**获取当前用户菜单 */
export function getMenuList(data) {
  return request({
    url: "/generic/basic/menu",
    method: "get",
    data: data,
  });
}

/**菜单列表 */
export function getMenu(data) {
  return request({
    url: "/menu/list/tree",
    method: "post",
    data,
  });
}

/**新增菜单 */
export function addMenu(data) {
  return request({
    url: "/menu/save/one",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: "/menu/update/one",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: "/menu/remove/one?menuId=" + menuId,
    method: "delete",
  });
}
