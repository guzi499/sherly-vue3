/**
 * @author 陈雪丽
 * @date 2022-11-09
 */
import request from "@/utils/request";

// 错误分页
export function errorListPage(data) {
  return request({
    url: "/error_code/list_page",
    method: "get",
    params: data,
  });
}

// 错误删除
export function errorCodeRemoveOne(errorId) {
  return request({
    url: `/error_code/remove_one?errorId=${errorId}`,
    method: "delete",
  });
}

// 错误新增
export function errorCodeSaveOne(data) {
  return request({
    url: "/error_code/save_one",
    method: "post",
    data: data,
  });
}

// 错误更新
export function errorCodeUpdateOne(data) {
  return request({
    url: "/error_code/update_one",
    method: "put",
    data: data,
  });
}
