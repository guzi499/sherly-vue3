import request from "@/utils/request";

/**获取公共菜单下拉框 */
export function getMenuList(data) {
  return request({
    url: "/generic/basic/menu",
    method: "get",
    data: data,
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
