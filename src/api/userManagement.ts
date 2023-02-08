import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {
  userBanOneDTO,
  userGetOneVO,
  userListAllDTO,
  userListAllVO,
  userListPageDTO,
  userListPageVO,
  userRemoveOneDTO,
  userSaveOneDTO,
  userUpdateOneDTO
} from "@/api/interface/userManagement";
import {isEmpty} from "@/globalType";

/** 用户分页 */
export const userListPage = (params?: userListPageDTO) => {
  return http.request<userListPageVO>("get", baseUrlApi("/user/list_page"), {
    params
  });
};

/** 用户新增 */
export const userSaveOne = (data?: userSaveOneDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/user/save_one"), {
    data
  });
};

/** 用户编辑 */
export const userUpdateOne = (data?: userUpdateOneDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/user/update_one"), {
    data
  });
};

/** 用户删除 */
export const userRemoveOne = (params?: userRemoveOneDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/user/remove_one"), {
    params
  });
};

/** 用户详情 */
export const userGetOne = (params?: userRemoveOneDTO) => {
  return http.request<userGetOneVO>("get", baseUrlApi("/user/get_one"), {
    params
  });
};

/** 用户查询 */
export const userListAll = (params?: userListAllDTO) => {
  return http.request<userListAllVO>("get", baseUrlApi("/user/list_all"), {
    params
  });
};

/** 用户禁用 - 启用 */
export const userBanOne = (data?: userBanOneDTO) => {
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

