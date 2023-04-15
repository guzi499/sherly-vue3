import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  TenantListMenuReqDTO,
  TenantListMenuRespDTO,
  TenantListPageReqDTO,
  TenantListPageRespDTO,
  TenantRemoveOneReqDTO,
  TenantSaveOneReqDTO,
  TenantUpdateMenuReqDTO,
  TenantUpdateOneReqDTO
} from "@/api/interface/tenant_list";

/** 租户菜单列表 */
export const tenantListMenu = (params?: TenantListMenuReqDTO) => {
  return http.request<TenantListMenuRespDTO>(
    "get",
    baseUrlApi("/tenant/list_menu"),
    {
      params
    }
  );
};

/** 租户分页 */
export const tenantListPage = (params?: TenantListPageReqDTO) => {
  return http.request<TenantListPageRespDTO>(
    "get",
    baseUrlApi("/tenant/list_page"),
    {
      params
    }
  );
};

/** 租户新增 */
export const tenantSaveOne = (data?: TenantSaveOneReqDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/tenant/save_one"), {
    data
  });
};

/** 租户更新 */
export const tenantUpdateOne = (data?: TenantUpdateOneReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/tenant/update_one"), {
    data
  });
};

/** 租户删除 */
export const tenantRemoveOne = (params?: TenantRemoveOneReqDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/tenant/remove_one"), {
    params
  });
};

/** 租户菜单更新 */
export const tenantUpdateMenu = (data?: TenantUpdateMenuReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/tenant/update_menu"), {
    data
  });
};
