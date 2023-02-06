import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

export type RolePageDTO = {
  current: number;
  size: number;
  roleName: string;
};

export type PageResult = {
  result: Array<RolePageVO>;
  total: number;
};

export type RolePageVO = {
  createTime: string;
  description: number;
  roleId: number;
  roleName: string;
};

/** 登录 */
export const roleListPage = (data?: RolePageDTO) => {
  return http.request<PageResult>("get", baseUrlApi("/role/list_page"), {
    data
  });
};
