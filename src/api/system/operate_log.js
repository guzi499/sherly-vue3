import request from "@/utils/request";

/**操作日志分页 */
export function getOperationList(params) {
    return request({
        url: "/operation_log/list_page",
        method: "get",
        params,
    });
}

/**操作日志详情 */
export function getOperationOne(logId) {
    return request({
        url: `/operation_log/get_one?logId=${logId}`,
        method: "get",
    });
}

/**操作日志清空 */
export function delLog() {
    return request({
        url: `/operation_log/remove_all`,
        method: "delete",
    });
}

