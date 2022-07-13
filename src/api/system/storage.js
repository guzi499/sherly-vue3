/*
 * @Author: lihaoyu
 * @Date: 2022-07-08 23:23:03
 * @LastEditTime: 2022-07-14 00:51:30
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/storage.js
 */
import request from "@/utils/request";

/**获取对象存储列表 */
export function getStorageList(params) {
  return request({
    url: "/oss_config/list_page",
    method: "get",
    params,
  });
}

/**保存对象存储 */
export function saveStorage(data) {
  return request({
    url: "/oss_config/save_one",
    method: "post",
    data,
  });
}

export function deleteStorage(configId) {
  return request({
    url: "oss_config/remove_one?configId=" + configId,
    method: "DELETE",
  });
}

export function getStorageDetail(configId) {
  return request({
    url: "oss_config/get_one?configId=" + configId,
    method: "GET",
  });
}

export function upDataStorage(data) {
  return request({
    url: "oss_config/update_one",
    method: "put",
    data,
  });
}

export function enableStorage(configId) {
  return request({
    url: "oss_config/enable_one?configId=" + configId,
    method: "put",
  });
}
