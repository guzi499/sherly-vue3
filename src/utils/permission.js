/*
 * @Author: lihaoyu
 * @Date: 2022-05-06 23:09:53
 * @LastEditTime: 2022-05-07 00:58:28
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/utils/permission.js
 */
import store from "@/store";

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */

const permission = (el, binding) => {
  const permissionRoles = binding.value || [];
  const userInfo = store.state.user.userInfo;
  const roles = userInfo && userInfo.basicPermissionVO;
  let status = roles.some((role) => {
    return permissionRoles.includes(role);
  });
  if (permissionRoles && permissionRoles instanceof Array) {
    if (!status) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};
export default permission;
