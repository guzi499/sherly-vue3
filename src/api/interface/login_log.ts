/** 登录日志分页 类型声明 */
export type LoginLogListPageReqDTO = {
  /** 开始时间 */
  beginTime?: string;
  /** 当前页 */
  current?: number;
  /** 结束时间 */
  endTime?: string;
  /** 登录结果,可用值:SUCCESS,CHECK_FAIL,DISABLE */
  result?: string;
  /** 页大小 */
  size?: number;
  /** 登录方式,可用值:PASSWORD */
  type?: string;
  /** 登录账号 */
  username?: string;
};

export type LoginLogListPageRespDTO = {
  result?: Array<PageResult>;
  total?: number;
};

export type PageResult = {
  /** 请求地址 */
  address?: string;
  /** 请求浏览器 */
  browser?: string;
  /** 创建时间 */
  createTime?: string;
  /** 请求ip */
  ip?: number;
  /** 日志编号 */
  logId?: number;
  /** 请求系统 */
  os?: string;
  /** 登录结果,可用值:SUCCESS,CHECK_FAIL,DISABLE */
  result?: string;
  /** 登录方式,可用值:PASSWORD */
  type?: string;
  /** 登录账号 */
  username?: string;
};
