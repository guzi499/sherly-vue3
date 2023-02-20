import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  UserBanOneDTO,
  UserGetOneVO,
  UserListAllDTO,
  UserListAllVO,
  UserListPageDTO,
  UserListPageVO,
  UserRemoveOneDTO,
  UserSaveOneDTO,
  UserUpdateOneDTO
} from "@/api/interface/userManagement";
import { isEmpty } from "@/globalType";

/** 用户分页 */
export const userListPage = (params?: UserListPageDTO) => {
  return http.request<UserListPageVO>("get", baseUrlApi("/user/list_page"), {
    params
  });
};

/** 用户新增 */
export const userSaveOne = (data?: UserSaveOneDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/user/save_one"), {
    data
  });
};

/** 用户编辑 */
export const userUpdateOne = (data?: UserUpdateOneDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/user/update_one"), {
    data
  });
};

/** 用户删除 */
export const userRemoveOne = (params?: UserRemoveOneDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/user/remove_one"), {
    params
  });
};

/** 用户详情 */
export const userGetOne = (params?: UserRemoveOneDTO) => {
  return http.request<UserGetOneVO>("get", baseUrlApi("/user/get_one"), {
    params
  });
};

/** 用户查询 */
export const userListAll = (params?: UserListAllDTO) => {
  return http.request<UserListAllVO>("get", baseUrlApi("/user/list_all"), {
    params
  });
};

/** 用户禁用 - 启用 */
export const userBanOne = (data?: UserBanOneDTO) => {
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
