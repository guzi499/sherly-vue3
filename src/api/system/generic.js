/*
 * @Author: lihaoyu
 * @Date: 2022-05-06 21:46:57
 * @LastEditTime: 2022-05-06 22:36:48
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/generic.js
 */
import request from "@/utils/request";

/**获取登录基本信息 */
export function getDasicData(data) {
  return request({
    url: "/generic/basic/data",
    method: "get",
    data: data,
  });
}
