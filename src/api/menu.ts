import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  MenuListTreeVO,
  MenuRemoveOneDTO,
  MenuSaveOneDTO,
  MenuUpdateOneDTO
} from "@/api/interface/menu";
import { isEmpty } from "@/globalType";

/** 查询菜单树 */
export const menuListTree = (params?: isEmpty) => {
  return http.request<MenuListTreeVO[]>("get", baseUrlApi("/menu/list_tree"), {
    params
  });
};

/** 菜单新增 */
export const menuSaveOne = (data?: MenuSaveOneDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/menu/save_one"), {
    data
  });
};

/** 菜单修改 */
export const menuUpdateOne = (data?: MenuUpdateOneDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/menu/update_one"), {
    data
  });
};

/** 菜单删除 */
export const menuRemoveOne = (params?: MenuRemoveOneDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/menu/remove_one"), {
    params
  });
};
