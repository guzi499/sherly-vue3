import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  MenuListTreeRespDTO,
  MenuRemoveOneReqDTO,
  MenuSaveOneReqDTO,
  MenuUpdateOneReqDTO
} from "@/api/interface/menu";
import { isEmpty } from "@/globalType";

/** 查询菜单树 */
export const menuListTree = (params?: isEmpty) => {
  return http.request<MenuListTreeRespDTO[]>(
    "get",
    baseUrlApi("/menu/list_tree"),
    {
      params
    }
  );
};

/** 菜单新增 */
export const menuSaveOne = (data?: MenuSaveOneReqDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/menu/save_one"), {
    data
  });
};

/** 菜单修改 */
export const menuUpdateOne = (data?: MenuUpdateOneReqDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/menu/update_one"), {
    data
  });
};

/** 菜单删除 */
export const menuRemoveOne = (params?: MenuRemoveOneReqDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/menu/remove_one"), {
    params
  });
};
