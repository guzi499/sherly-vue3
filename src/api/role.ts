import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  RolePageReqDTO,
  PageResult,
  RoleSaveOneReqDTO,
  RoleUpdateOneReqDTO,
  RoleRemoveOneReqDTO
} from "./interface/role";
import { isEmpty } from "@/globalType";

/** 角色分页 */
export const roleListPage = (params?: RolePageReqDTO) => {
  return http.request<PageResult>("get", baseUrlApi("/role/list_page"), {
    params
  });
};

/** 角色新增 */
export const roleSaveOne = (data?: RoleSaveOneReqDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/role/save_one"), {
    data
  });
};

/** 角色编辑 */
export const roleUpdateOne = (data?: RoleUpdateOneReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/role/update_one"), {
    data
  });
};

/** 角色删除 */
export const roleRemoveOne = (params?: RoleRemoveOneReqDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/role/remove_one"), {
    params
  });
};

/** 角色详情 */
export const roleGetOne = (params?: RoleRemoveOneReqDTO) => {
  return http.request<RoleUpdateOneReqDTO>("get", baseUrlApi("/role/get_one"), {
    params
  });
};
