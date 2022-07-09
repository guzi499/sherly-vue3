/*
 * @Author: lihaoyu
 * @Date: 2022-07-08 23:23:03
 * @LastEditTime: 2022-07-09 23:15:51
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/storage.js
 */
import request from "@/utils/request";

/**获取对象存储列表 */
export function getStorageList(params) {
  return request({
    url: "/oss/config/list/page",
    method: "get",
    params,
  });
}

/**保存对象存储 */
export function saveStorage(data) {
  return request({
    url: "/oss/config/save/one",
    method: "post",
    data,
  });
}

export function deleteStorage(configId) {
  return request({
    url: "oss/config/remove/one?configId=" + configId,
    method: "DELETE",
  });
}
