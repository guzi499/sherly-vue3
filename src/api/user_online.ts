import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  UserOnlineForceQuitReqDTO,
  UserOnlineListAllReqDTO,
  UserOnlineListAllRespDTO
} from "@/api/interface/user_online";

/** 在线用户列表 */
export const userOnlineListAll = (params?: UserOnlineListAllReqDTO) => {
  return http.request<UserOnlineListAllRespDTO[]>(
    "get",
    baseUrlApi("/user_online/list_all"),
    {
      params
    }
  );
};

/** 强制退出 */
export const userOnlineForceQuit = (params?: UserOnlineForceQuitReqDTO) => {
  return http.request<isEmpty>(
    "delete",
    baseUrlApi("/user_online/force_quit"),
    {
      params
    }
  );
};
