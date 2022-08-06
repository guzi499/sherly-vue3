/**
 * @author 陈雪丽
 * @date 2022/7/7
 */

import request from "@/utils/request";

// 邮箱配置详情
export function emailGetOne(params) {
    return request({
        url: "/email/get_one",
        method: "get",
        params
    });
}

// 邮件配置保存或修改
export function emailSaveOrUpdate(data) {
    return request({
        url: `/email/save_or_update`,
        method: "post",
        data,
    });
}

// 邮件发送
export function emailSend(data) {
    return request({
        url: `/email/send`,
        method: "post",
        data,
    });
}
