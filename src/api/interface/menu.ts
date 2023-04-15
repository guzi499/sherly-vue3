/** 菜单树 类型声明 */
export type MenuListTreeRespDTO = {
  children?: Array<MenuListTreeRespDTO>;
  /** 创建时间 */
  createTime?: string;
  /** 菜单编号 */
  menuId?: number;
  /** 菜单图标 */
  icon?: string;
  /** 菜单名称	*/
  menuName?: string;
  /** 菜单类型,可用值:DIR,MENU,BUTTON */
  menuType?: string;
  /**	父菜单编号 */
  parentId?: number;
  /** 菜单路径 */
  path?: string;
  /**	权限 */
  permission?: string;
  /**	排序 */
  sort?: number;
};

/** 菜单新增 类型声明 */
export type MenuSaveOneReqDTO = {
  /** 菜单图标 */
  icon?: string;
  /** 菜单名称	*/
  menuName?: string;
  /** 菜单类型,可用值:DIR,MENU,BUTTON */
  menuType?: string;
  /**	父菜单编号 */
  parentId?: number;
  /** 菜单路径 */
  path?: string;
  /**	权限 */
  permission?: string;
  /**	排序 */
  sort?: number;
};

/** 菜单修改 类型声明 */
export type MenuUpdateOneReqDTO = {
  /** 菜单图标 */
  icon?: string;
  /** 菜单编号 */
  menuId?: number;
  /** 菜单名称	*/
  menuName?: string;
  /** 菜单类型,可用值:DIR,MENU,BUTTON */
  menuType?: string;
  /**	父菜单编号 */
  parentId?: number;
  /** 菜单路径 */
  path?: string;
  /**	权限 */
  permission?: string;
  /**	排序 */
  sort?: number;
};

/** 菜单删除 类型声明 */
export type MenuRemoveOneReqDTO = {
  /** 菜单编号 */
  menuId?: number;
};
