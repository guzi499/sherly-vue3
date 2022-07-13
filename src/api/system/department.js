/*
 * @Author: lihaoyu
 * @Date: 2022-04-21 22:50:32
 * @LastEditTime: 2022-05-06 21:43:14
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/menu.js
 */
import request from "@/utils/request";

/**查询部门树 */
export function getDepartmentListTree(query) {
  return request({
    url: "/department/list_tree",
    method: "get",
    params: query
  });
}

/**部门新增 */
export function addDepartment(data) {
  return request({
    url: "/department/save_one",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function updateDepartment(data) {
  return request({
    url: "/department/update_one",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function delDepartment(departmentId) {
  return request({
    url: "/department/remove_one?departmentId=" + departmentId,
    method: "delete",
  });
}
