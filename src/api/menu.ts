import {http} from "@/utils/http";
import {baseUrlApi} from "@/api/utils";
import {menuListTreeDTO, menuListTreeVO} from "@/api/interface/menu";

/** 查询菜单树 */
export const menuListTree = (params?: menuListTreeDTO) => {
  return http.request<menuListTreeVO[]>("get", baseUrlApi("/menu/list_tree"), {
    params
  });
};
