/** 在线用户列表 类型声明 */
export type UserOnlineListAllDTO = {
  /** 手机号 */
  phone?: string;
};

export type UserOnlineListAllVO = {
  /** 登录地址 */
  address?: string;
  /** 登录浏览器 */
  browser?: string;
  /** 登录ip */
  ip?: string;
  /** 登录租户代码 */
  loginTenantCode?: string;
  /** 登录时间 */
  loginTime?: string;
  /** 昵称 */
  nickname?: string;
  /** 登录系统 */
  os?: string;
  /** 手机号 */
  phone?: string;
  /** 姓名 */
  realName?: string;
  /** 会话编号 */
  sessionId?: number;
  /** 用户编号 */
  userId?: number;
};

/** 强制退出 类型声明 */
export type UserOnlineForceQuitDTO = {
  /** 会话编号 */
  sessionId?: number;
};
