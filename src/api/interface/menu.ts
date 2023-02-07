import {roleGetOne, roleRemoveOne, roleSaveOne, roleUpdateOne} from "@/api/role";
import {menuListTree} from "@/api/menu";

/** 菜单树 类型声明 */
export type menuListTreeDTO = {};

export type menuListTreeVO = {
  children?: Array<menuListTreeVO>;
  createTime?: string;
  icon?: string;
  menuId?: number;
  menuName?: string;
  menuType?: string;
  parentId?: number;
  path?: string;
  permission?: string;
  sort?: number
};


