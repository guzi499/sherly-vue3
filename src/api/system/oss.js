/*
 * @Author: lihaoyu
 * @Date: 2022-07-08 23:23:03
 * @LastEditTime: 2022-07-21 23:17:20
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/system/oss.js
 */
import request from "@/utils/request";

/**获取对象存储列表 */
export function getOssConfigList(params) {
  return request({
    url: "/oss_config/list_page",
    method: "get",
    params,
  });
}

/**保存对象存储 */
export function saveOssConfig(data) {
  return request({
    url: "/oss_config/save_one",
    method: "post",
    data,
  });
}

/**删除对象存储 */
export function deleteOssConfig(configId) {
  return request({
    url: "oss_config/remove_one?configId=" + configId,
    method: "DELETE",
  });
}

/**获取对象存储详情 */
export function getOssDetail(configId) {
  return request({
    url: "oss_config/get_one?configId=" + configId,
    method: "GET",
  });
}

/**更新对象存储详情 */
export function upDataOss(data) {
  return request({
    url: "oss_config/update_one",
    method: "put",
    data,
  });
}

export function enableOss(configId) {
  return request({
    url: "oss_config/enable_one?configId=" + configId,
    method: "put",
  });
}

export function getOssList(params) {
  return request({
    url: "oss/list_page",
    method: "get",
    params,
  });
}

export function deleteOss(fileId) {
  return request({
    url: "oss/remove_one?fileId=" + fileId,
    method: "DELETE",
  });
}
