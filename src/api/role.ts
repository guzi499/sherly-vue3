import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {
  RolePageDTO,
  PageResult,
  RoleSaveOneDTO,
  RoleSaveOneVO,
  RoleUpdateOneDTO,
  RoleRemoveOneDTO
} from './interface/role'

/** 角色分页 */
export const roleListPage = (params?: RolePageDTO) => {
  return http.request<PageResult>("get", baseUrlApi("/role/list_page"), {
    params
  });
};

/** 角色新增 */
export const roleSaveOne = (data?: RoleSaveOneDTO) => {
  return http.request<RoleSaveOneVO>("post", baseUrlApi("/role/save_one"), {
    data
  });
};

/** 角色编辑 */
export const roleUpdateOne = (data?: RoleUpdateOneDTO) => {
  return http.request<RoleSaveOneVO>("put", baseUrlApi("/role/update_one"), {
    data
  });
};

/** 角色删除 */
export const roleRemoveOne = (params?: RoleRemoveOneDTO) => {
  return http.request<RoleSaveOneVO>("delete", baseUrlApi("/role/remove_one"), {
    params
  });
};

/** 角色详情 */
export const roleGetOne = (params?: RoleRemoveOneDTO) => {
  return http.request<RoleUpdateOneDTO>("get", baseUrlApi("/role/get_one"), {
    params
  });
};
