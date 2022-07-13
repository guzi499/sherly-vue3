/*
 * @Author: lihaoyu
 * @Date: 2022-05-28 21:58:34
 * @LastEditTime: 2022-05-28 23:33:15
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/online.js
 */
import request from "@/utils/request";

/**获取租户列表 */
export function getOnline(params) {
  return request({
    url: `/user_online/list?`,
    method: "get",
    params,
  });
}

/**删除租户 */
export function delOnline(params) {
  return request({
    url: `/user_online/force_quit`,
    method: "delete",
    params,
  });
}
