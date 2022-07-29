/*
 * @Author: lihaoyu
 * @Date: 2022-05-06 21:46:57
 * @LastEditTime: 2022-07-24 17:45:39
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/generic.js
 */
import request from "@/utils/request";

/** 获取当前用户菜单 */
export function getBasicData(data) {
  return request({
    url: "/generic/basic_data",
    method: "get",
    data: data,
  });
}

/** 心脏检测 */
export function heartBzeat(data) {
  return request({
    url: "/generic/heart_beat",
    method: "get",
    data: data,
  });
}
