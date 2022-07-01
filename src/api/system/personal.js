import request from "@/utils/request";

/**用户个人中心 */
export function getSelf(params) {
    return request({
        url: "/user/get/self?userId=" + params,
        method: "get"
    });
}

/**用户更新头像 */
export function updateAvatar(data) {
    return request({
        url: `/user/update/avatar`,
        method: "put",
        data,
    });
}

/**用户修改密码 */
export function updatePassword(data) {
    return request({
        url: `/user/update/password`,
        method: "put",
        data,
    });
}

/**用户个人中心更新 */
export function updateSelf(data) {
    return request({
        url: `/user/update/self`,
        method: "put",
        data,
    });
}
