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

/** 登录 */
export const login = (data?: object) => {
  return http.request<LoginVO>("post", baseUrlApi("/login"), { data });
};
