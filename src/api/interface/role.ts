/** 角色分页 类型声明 */
export type RolePageDTO = {
  /** 当前页 */
  current?: number;
  /** 页大小 */
  size?: number;
  /** 角色名称 */
  roleName?: string;
};

export type PageResult = {
  result?: Array<RolePageVO>;
  total?: number;
};

export type RolePageVO = {
  /** 创建时间 */
  createTime?: string;
  /** 角色编号 */
  roleId?: number;
  /** 描述 */
  description?: string;
  /** 角色名称 */
  roleName?: string;
};

/** 角色新增 类型声明 */
export type RoleSaveOneDTO = {
  /** 描述 */
  description?: string;
  /** 角色名称 */
  roleName?: string;
};

/** 角色编辑 类型声明 */
export type RoleUpdateOneDTO = {
  /** 菜单ids */
  menuIds?: number[];
  /** 角色编号 */
  roleId?: number;
  /** 描述 */
  description?: string;
  /** 角色名称 */
  roleName?: string;
};

/** 角色删除 类型声明 */
export type RoleRemoveOneDTO = {
  /** 角色编号 */
  roleId?: number;
};
