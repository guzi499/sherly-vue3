/**
 * @author 陈雪丽
 * @date 2022/11/8
 */
import request from "@/utils/request";

// 查询模块树
export function moduleListTree(query) {
    return request({
        url: "/module/list_tree",
        method: "get",
        params: query
    });
}

// 模块新增
export function moduleSaveOne(data) {
    return request({
        url: "/module/save_one",
        method: "post",
        data: data,
    });
}

// 模块更新
export function moduleUpdateOne(data) {
    return request({
        url: "/module/update_one",
        method: "put",
        data: data,
    });
}

// 模块删除
export function moduleRemoveOne(moduleId) {
    return request({
        url: `/module/remove_one?moduleId=${moduleId}` ,
        method: "delete",
    });
}
