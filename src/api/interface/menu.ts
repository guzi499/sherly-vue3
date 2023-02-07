/** 重复类型 空对象 */
export type menuEmpty = {};

/** 菜单树 类型声明 */
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

/** 菜单新增 类型声明 */
export type menuSaveOneDTO = {
  icon?: string;
  menuName?: string;
  menuType?: string;
  parentId?: number;
  path?: string;
  permission?: string;
  sort?: number
};

/** 菜单修改 类型声明 */
export type menuUpdateOneDTO = {
  icon?: string;
  menuId ?: number;
  menuName?: string;
  menuType?: string;
  parentId?: number;
  path?: string;
  permission?: string;
  sort?: number
};

/** 菜单删除 类型声明 */
export type menuRemoveOneDTO = {
  menuId ?: number;
};


