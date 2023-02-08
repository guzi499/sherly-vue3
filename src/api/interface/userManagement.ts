/** 用户分页 类型声明 */
export type userListPageDTO = {
  /** 开始时间 */
  beginTime?: string;
  /** 当前页 */
  current?: number;
  /** 部门ids */
  departmentIds?: number[];
  /** 用户邮箱  */
  email?: string;
  /** 可用性,可用值:FEMALE,MALE,UNKNOWN */
  enable?: string;
  /** 结束时间 */
  endTime?: string;
  /** 昵称 */
  nickname?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 页大小 */
  size?: number;
  /** 创建时间 */
  createTime?: ['', '']
};

export type userListPageVO = {
  result?: Array<PageResult>;
  total?: number;
};

export type PageResult = {
  /** 用户邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 用户id */
  userId?: number;
  /** 创建时间 */
  createTime?: string;
  /** 部门id */
  departmentId?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 可用性,可用值:ENABLE,DISABLE */
  enable?: string;
  /** 性别,可用值:FEMALE,MALE,UNKNOWN */
  gender?: string;
  /** 昵称 */
  nickname?: string;
};

/** 用户新增 类型声明 */
export type userSaveOneDTO = {
  /** 部门编号 */
  departmentId?: number;
  /** 性别,可用值:FEMALE,MALE,UNKNOWN */
  gender?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /**  角色ids */
  roleIds?: number[];
};

/** 用户编辑 类型声明 */
export type userUpdateOneDTO = {
  /** 部门编号 */
  departmentId?: number;
  /** 性别,可用值:FEMALE,MALE,UNKNOWN */
  gender?: string;
  /** 姓名 */
  realName?: string;
  /**  角色ids */
  roleIds?: number[];
  /** 用户编号 */
  userId?: number;
  /** 手机号 */
  phone?: string;
  /** 昵称 */
  nickname?: string
};

/** 用户删除 类型声明 */
export type userRemoveOneDTO = {
  /** 用户编号 */
  userId?: number;
};

/** 用户详情 类型声明 */
export type userGetOneVO = {
  /** 部门编号 */
  departmentId?: number;
  /** 性别,可用值:FEMALE,MALE,UNKNOWN */
  gender?: string;
  /** 昵称 */
  nickname?: string;
  /** 角色ids */
  roleIds?: number[];
  /** 用户邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 用户id */
  userId?: number;
};

/** 用户查询 类型声明 */
export type userListAllDTO = {
  /** 部门ids */
  departmentIds?: number[];
  /** 用户邮箱 */
  email?: string;
  /** 可用性,可用值:FEMALE,MALE,UNKNOWN */
  enable?: boolean;
  /** 昵称 */
  nickname?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 角色ids */
  roleIds?: number[];
  /** 用户ids */
  userIds?: number[];
};

export type userListAllVO = {
  /** 用户邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 用户id */
  userId?: number;
};

/** 用户禁用 - 启用 类型声明 */
export type userBanOneDTO = {
  /** 可用性,可用值:FEMALE,MALE,UNKNOWN */
  enable?: string;
  /** 用户id */
  userId?: number;
};


