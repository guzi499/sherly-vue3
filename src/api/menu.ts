import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import {
  menuListTreeVO,
  menuRemoveOneDTO,
  menuSaveOneDTO,
  menuUpdateOneDTO
} from "@/api/interface/menu";
import { isEmpty } from "@/globalType";

/** 查询菜单树 */
export const menuListTree = (params?: isEmpty) => {
  return http.request<menuListTreeVO[]>("get", baseUrlApi("/menu/list_tree"), {
    params
  });
};

/** 菜单新增 */
export const menuSaveOne = (data?: menuSaveOneDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/menu/save_one"), {
    data
  });
};

/** 菜单修改 */
export const menuUpdateOne = (data?: menuUpdateOneDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/menu/update_one"), {
    data
  });
};

/** 菜单删除 */
export const menuRemoveOne = (params?: menuRemoveOneDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/menu/remove_one"), {
    params
  });
};
