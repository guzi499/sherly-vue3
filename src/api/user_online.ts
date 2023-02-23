import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  UserOnlineForceQuitDTO,
  UserOnlineListAllDTO,
  UserOnlineListAllVO
} from "@/api/interface/user_online";

/** 在线用户列表 */
export const userOnlineListAll = (params?: UserOnlineListAllDTO) => {
  return http.request<UserOnlineListAllVO[]>(
    "get",
    baseUrlApi("/user_online/list_all"),
    {
      params
    }
  );
};

/** 强制退出 */
export const userOnlineForceQuit = (params?: UserOnlineForceQuitDTO) => {
  return http.request<isEmpty>(
    "delete",
    baseUrlApi("/user_online/force_quit"),
    {
      params
    }
  );
};
