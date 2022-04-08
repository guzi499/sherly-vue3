/*
 * @Author: lihaoyu
 * @Date: 2022-04-07 22:38:48
 * @LastEditTime: 2022-04-07 23:17:35
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/api/router.js
 */
import request from "@/utils/request";

export default {
  getMenu(data) {
    return request({
      url: "/menu/list/tree",
      method: "post",
      data,
    });
  },
};
