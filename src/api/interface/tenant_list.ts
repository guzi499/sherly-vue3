/** 租户菜单列表 类型声明 */
export type TenantListMenuDTO = {
  /** 租户ID */
  tenantId?: number;
};

export type TenantListMenuVO = [];

/** 租户分页 类型声明 */
export type TenantListPageDTO = {
  /** 开始过期时间 */
  beginExpireTime?: string;
  /** 开始时间 */
  beginTime?: string;
  /** 开始用户上限 */
  beginUserLimit?: number;
  /** 联系电话 */
  contactPhone?: string;
  /** 联系人 */
  contactUser?: string;
  /** 当前页 */
  current?: number;
  /** 结束过期时间 */
  endExpireTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 结束用户上限 */
  endUserLimit?: number;
  /** 页大小 */
  size?: number;
  /** 租户代码 */
  tenantCode?: string;
  /** 租户名称 */
  tenantName?: string;
};

export type TenantListPageVO = {
  result?: Array<PageResult>;
  total?: number;
};

export type PageResult = {
  /** 联系电话 */
  contactPhone?: string;
  /** 联系人 */
  contactUser?: string;
  /** 创建时间 */
  createTime?: string;
  /** 过期时间 */
  expireTime?: number;
  /** 租户代码 */
  tenantCode?: string;
  /** 租户编号*/
  tenantId?: number;
  /** 租户名称 */
  tenantName?: string;
  /** 用户上限 */
  userLimit?: number;
};

/** 租户新增 类型声明 */
export type TenantSaveOneDTO = {
  /** 联系电话 */
  contactPhone?: string;
  /** 联系人 */
  contactUser?: string;
  /** 过期时间 */
  expireTime?: string;
  /** 租户代码 */
  tenantCode?: string;
  /** 租户名称 */
  tenantName?: string;
  /** 用户上限 */
  userLimit?: number;
};

/** 租户更新 类型声明 */
export type TenantUpdateOneDTO = {
  /** 过期时间 */
  expireTime?: string;
  /** 租户编号 */
  tenantId?: number;
  /** 用户上限 */
  userLimit?: number;
};

/** 租户删除 类型声明 */
export type TenantRemoveOneDTO = {
  /** 租户编号 */
  tenantId?: number;
};

/** 租户菜单更新 类型声明 */
export type TenantUpdateMenuDTO = {
  /** 菜单ID */
  menuIds?: number[];
  /** 租户ID */
  tenantId?: number;
};
