/**
 * @author 陈雪丽
 * @date 2022/7/23
 */

import request from "@/utils/request";
/** 登录日志分页 */
export function getLoginLogList(params) {
    return request({
        url: "/login_log/list_page",
        method: "get",
        params,
    });
}

/** 登录日志清空 */
export function deleteLoginLogRemoveAll() {
    return request({
        url: `/login_log/remove_all`,
        method: "delete",
    });
}
