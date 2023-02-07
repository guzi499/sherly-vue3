/** 角色分页 类型声明 */
export type RolePageDTO = {
  current: number;
  size: number;
  roleName: string;
};

export type PageResult = {
  result: Array<RolePageVO>;
  total: number;
};

export type RolePageVO = {
  createTime: string;
  description: number;
  roleId: number;
  roleName: string;
};

/** 角色新增 类型声明 */
export type RoleSaveOneDTO = {
  description?: string;
  roleName: string;
};

export type RoleSaveOneVO = {};

/** 角色编辑 类型声明 */
export type RoleUpdateOneDTO = {
  description?: string;
  menuIds?: number[];
  roleId?: number;
  roleName?: string;
};

/** 角色删除 类型声明 */
export type RoleRemoveOneDTO = {
  roleId: number;
};


