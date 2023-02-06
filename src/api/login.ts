import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

export type LoginVO = {
  token: string;
};

export type LoginDTO = {
  phone: string;
  password: string;
  tenant: string;
};

export type BasicMenuInfoVO = {
  children: BasicMenuInfoVO[];
  icon: string;
  path: string;
  menuId: number;
  menuName: string;
};

export type BasicInfoVO = {
  basicMenuInfoVO: Array<BasicMenuInfoVO>;
  basicPermissionVO: string[];
  basicRoleInfoVO: {
    roleId: number;
    roleName: string;
  };
  basicUserInfoVO: {
    avatar: string;
    departmentId: number;
    email: string;
    gender: string;
    nickname: string;
    phone: string;
    realName: string;
    tenantCode: string;
    tenantName: string;
    userId: number;
  };
};

/** 登录 */
export const login = (data?: LoginDTO) => {
  return http.request<LoginVO>("post", baseUrlApi("/login"), { data });
};

/** 用户登录基本信息 */
export const genericBasicData = () => {
  return http.request<BasicInfoVO>("get", baseUrlApi("/generic/basic_data"));
};
