import request from "@/utils/request";

/**邮箱配置详情 */
export function getEmailOne(params) {
    return request({
        url: "/email/get/one",
        method: "get",
        params
    });
}

/**邮件配置保存或修改 */
export function saveOrUpdateEmail(data) {
    return request({
        url: `/email/saveOrUpdate/one`,
        method: "post",
        data,
    });
}

/**邮件发送 */
export function sendEmail(data) {
    return request({
        url: `/email/send`,
        method: "post",
        data,
    });
}