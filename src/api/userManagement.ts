import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  UserBanOneReqDTO,
  UserGetOneRespDTO,
  UserListAllReqDTO,
  UserListAllRespDTO,
  UserListPageReqDTO,
  UserListPageRespDTO,
  UserRemoveOneReqDTO,
  UserSaveOneReqDTO,
  UserUpdateOneReqDTO
} from "@/api/interface/userManagement";
import { isEmpty } from "@/globalType";

/** 用户分页 */
export const userListPage = (params?: UserListPageReqDTO) => {
  return http.request<UserListPageRespDTO>(
    "get",
    baseUrlApi("/user/list_page"),
    {
      params
    }
  );
};

/** 用户新增 */
export const userSaveOne = (data?: UserSaveOneReqDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/user/save_one"), {
    data
  });
};

/** 用户编辑 */
export const userUpdateOne = (data?: UserUpdateOneReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/user/update_one"), {
    data
  });
};

/** 用户删除 */
export const userRemoveOne = (params?: UserRemoveOneReqDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/user/remove_one"), {
    params
  });
};

/** 用户详情 */
export const userGetOne = (params?: UserRemoveOneReqDTO) => {
  return http.request<UserGetOneRespDTO>("get", baseUrlApi("/user/get_one"), {
    params
  });
};

/** 用户查询 */
export const userListAll = (params?: UserListAllReqDTO) => {
  return http.request<UserListAllRespDTO>("get", baseUrlApi("/user/list_all"), {
    params
  });
};

/** 用户禁用 - 启用 */
export const userBanOne = (data?: UserBanOneReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/user/ban_one"), {
    data
  });
};

/** 用户导出 */
export const userListExport = (params?: isEmpty) => {
  return http.request<isEmpty>("get", baseUrlApi("/user/list_export"), {
    params
  });
};
