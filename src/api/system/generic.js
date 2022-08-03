/**
 * @author 李浩宇
 * @date 2022/5/6
 */
import request from "@/utils/request";

// 获取当前用户菜单
export function getBasicData(data) {
  return request({
    url: "/generic/basic_data",
    method: "get",
    data: data,
  });
}

// 心脏检测
export function heartBzeat() {
  return request({
    url: "/generic/heart_beat",
    method: "get",
  });
}
