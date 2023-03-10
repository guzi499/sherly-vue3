/**
 * @author 陈雪丽
 * @date 2022/7/20
 */

import request from "@/utils/request";

// 操作日志分页
export function operationLogListPage(params) {
    return request({
        url: "/operation_log/list_page",
        method: "get",
        params,
    });
}

// 操作日志详情
export function operationLogGetOne(logId) {
    return request({
        url: `/operation_log/get_one?logId=${logId}`,
        method: "get",
    });
}

// 操作日志清空
export function operationLogRemoveAll() {
    return request({
        url: `/operation_log/remove_all`,
        method: "delete",
    });
}

