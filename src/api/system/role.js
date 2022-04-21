/*
 * @Author: lihaoyu
 * @Date: 2022-04-20 11:01:33
 * @LastEditTime: 2022-04-20 11:03:44
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/role.js
 */

import request from "@/utils/request";

/**获取用户详情 */
export function getRoleLists(params) {
  return request({
    url: "/role/list/page",
    method: "get",
    params,
  });
}
