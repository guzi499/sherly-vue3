import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

export type LoginRespDTO = {
  token: string;
};

export type LoginReqDTO = {
  phone: string;
  password: string;
  tenant: string;
};

export type BasicMenuInfoRespDTO = {
  children: BasicMenuInfoRespDTO[];
  icon: string;
  path: string;
  menuId: number;
  menuName: string;
};

export type BasicInfoRespDTO = {
  basicMenuInfoRespDTO: Array<BasicMenuInfoRespDTO>;
  basicPermissionRespDTO: string[];
  basicRoleInfoRespDTO: {
    roleId: number;
    roleName: string;
  };
  basicUserInfoRespDTO: {
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
export const login = (data?: LoginReqDTO) => {
  return http.request<LoginRespDTO>("post", baseUrlApi("/login"), { data });
};

/** 用户登录基本信息 */
export const genericBasicData = () => {
  return http.request<BasicInfoRespDTO>(
    "get",
    baseUrlApi("/generic/basic_data")
  );
};
