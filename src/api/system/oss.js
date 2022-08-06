/**
 * @author 李浩宇
 * @date 2022/7/8
 */
import request from "@/utils/request";

// 获取对象存储列表
export function ossConfigListPage(params) {
  return request({
    url: "/oss_config/list_page",
    method: "get",
    params,
  });
}

// 保存对象存储
export function ossConfigSaveOne(data) {
  return request({
    url: "/oss_config/save_one",
    method: "post",
    data,
  });
}

// 删除对象存储
export function ossConfigRemoveOne(configId) {
  return request({
    url: `oss_config/remove_one?configId=${configId}`,
    method: "delete",
  });
}

// 获取对象存储详情
export function ossConfigGetOne(configId) {
  return request({
    url: `oss_config/get_one?configId=${configId}`,
    method: "get",
  });
}

// 更新对象存储详情
export function ossConfigUpdateOne(data) {
  return request({
    url: "oss_config/update_one",
    method: "put",
    data,
  });
}

// 启用对象存储
export function ossConfigEnableOne(configId) {
  return request({
    url: `oss_config/enable_one?configId=${configId}`,
    method: "put",
  });
}

// 获取文件列表
export function ossListPage(params) {
  return request({
    url: "oss/list_page",
    method: "get",
    params,
  });
}

// 删除文件列表
export function ossRemoveOne(fileId) {
  return request({
    url: `oss/remove_one?fileId=${fileId}`,
    method: "delete",
  });
}

// 获取文件下载地址
export function ossAccessUrl(path) {
  return request({
    url: `oss/access_url?path=${path}`,
    method: "get",
  });
}

// 文件下载
export function ossDownloadOne(params) {
  return request({
    url: "oss/download_one",
    method: "get",
    params,
    responseType: "blob",
  });
}
