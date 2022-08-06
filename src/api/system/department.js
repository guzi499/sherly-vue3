/**
 * @author 谷子毅
 * @date 2022/4/21
 */

import request from "@/utils/request";

// 查询部门树
export function departmentListTree(query) {
  return request({
    url: "/department/list_tree",
    method: "get",
    params: query
  });
}

// 部门新增
export function departmentSaveOne(data) {
  return request({
    url: "/department/save_one",
    method: "post",
    data: data,
  });
}

// 部门更新
// 部门更新
export function departmentUpdateOne(data) {
  return request({
    url: "/department/update_one",
    method: "put",
    data: data,
  });
}

// 部门删除
export function departmentRemoveOne(departmentId) {
  return request({
    url: `/department/remove_one?departmentId=${departmentId}` ,
    method: "delete",
  });
}
