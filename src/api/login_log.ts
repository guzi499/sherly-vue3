import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  LoginLogListPageReqDTO,
  LoginLogListPageRespDTO
} from "@/api/interface/login_log";

/** 登录日志分页 */
export const loginLogListPage = (params?: LoginLogListPageReqDTO) => {
  return http.request<LoginLogListPageRespDTO>(
    "get",
    baseUrlApi("/login_log/list_page"),
    {
      params
    }
  );
};

/** 登录日志清空 */
export const loginLogRemoveAll = (params?: isEmpty) => {
  return http.request<isEmpty>("delete", baseUrlApi("/login_log/remove_all"), {
    params
  });
};
