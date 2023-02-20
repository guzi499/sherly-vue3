/** 操作日志分页 类型声明 */
export type OperationLogListPageDTO = {
  /** 开始耗时 */
  beginDuration?: number;
  /** 开始时间 */
  beginTime?: string;
  /** 当前页 */
  current?: number;
  /** 结束耗时 */
  endDuration?: number;
  /** 结束时间 */
  endTime?: string;
  /** 姓名 */
  realName?: string;
  /** 请求方式 */
  requestMethod?: string;
  /** 页大小 */
  size?: number;
  /** 日志类型,可用值:NORMAL,EXCEPTION */
  type?: string;
  /** 请求uri */
  uri?: string;
  /** 用户ids */
  userIds?: number[];
};

export type OperationLogListPageVO = {
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
  /** 描述 */
  description?: string;
  /** 耗时 */
  duration?: number;
  /** 请求ip */
  ip?: number;
  /** 日志编号 */
  logId?: number;
  /** 操作用户 */
  operateUser?: string;
  /** 请求系统 */
  os?: string;
  /** 请求方式 */
  requestMethod?: string;
  /** 日志类型,可用值:NORMAL,EXCEPTION */
  type?: string;
  /** 请求uri */
  uri?: string;
};

/** 操作日志详情 类型声明 */
export type OperationLogGetOneDTO = {
  /** 日志编号 */
  logId?: number;
};

export type OperationLogGetOneVO = {
  /** 请求地址 */
  address?: string;
  /** 请求浏览器 */
  browser?: string;
  /** 描述 */
  description?: string;
  /** 耗时 */
  duration?: number;
  /** 异常描述 */
  exception?: string;
  /** 请求ip */
  ip?: number;
  /** 日志编号 */
  logId?: number;
  /** 请求系统 */
  os?: string;
  /** 请求方式 */
  requestMethod?: string;
  /** 请求参数 */
  requestParams?: string;
  /** 日志类型,可用值:NORMAL,EXCEPTION */
  type?: string;
  /** 请求uri */
  uri?: string;
};
