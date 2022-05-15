/*
 * @Author: lihaoyu
 * @Date: 2022-05-06 21:46:57
 * @LastEditTime: 2022-05-06 22:36:48
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/generic.js
 */
import request from "@/utils/request";

/**获取当前用户菜单 */
export function getBasicData(data) {
  return request({
    url: "/generic/basic/data",
    method: "get",
    data: data,
  });
}

/**获取当前用户菜单下拉框 */
export function getMenuList(data) {
  return request({
    url: "/generic/basic/menu",
    method: "get",
    data: data,
  });
}

/**获取当前部门下拉框 */
export function getDepartmentList(data) {
  return request({
    url: "/generic/basic/department",
    method: "get",
    data: data,
  });
}
