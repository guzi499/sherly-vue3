/**
 * @author 李浩宇
 * @date 2022/5/28
 */
import request from "@/utils/request";

// 获取租户列表
export function userOnlineListAll(params) {
  return request({
    url: `/user_online/list_all?`,
    method: "get",
    params,
  });
}

// 删除租户
export function userOnlineForceQuit(sessionId) {
  return request({
    url: `/user_online/force_quit?sessionId=${sessionId}`,
    method: "delete",
  });
}
