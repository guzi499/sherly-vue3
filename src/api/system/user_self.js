/**
 * @author 陈雪丽
 * @date 2022/7/2
 */
import request from "@/utils/request";

// 用户个人中心
export function userSelfGetSelf(params) {
    return request({
        url: "/user_self/get_self",
        method: "get",
        params
    });
}

// 用户更新头像
export function userSelfUpdateAvatar(data) {
    return request({
        url: `/user_self/update_avatar`,
        method: "put",
        data,
    });
}

// 用户修改密码
export function userSelfUpdatePassword(data) {
    return request({
        url: `/user_self/update_password`,
        method: "put",
        data,
    });
}

// 用户个人中心更新
export function userSelfUpdateSelf(data) {
    return request({
        url: `/user_self/update_self`,
        method: "put",
        data,
    });
}

// 个人中心操作日志分页
export function userSelfOperationLogListPage(params) {
    return request({
        url: "/user_self/operation_log/list_page",
        method: "get",
        params,
    });
}
