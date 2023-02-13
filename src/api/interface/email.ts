/** 邮件配置详情 类型声明 */
export type emailGetOneVO = {
  /** 创建时间 */
  createTime?: string;
  /** 邮件服务器SMTP地址 */
  host?: string;
  /** 密码 */
  password?: string;
  /** 	邮件服务器SMTP端口 */
  port?: string;
  /** 发件人邮箱	 */
  senderEmail?: string;
  /** 	发件人名称 */
  senderUser?: string;
};

/** 邮件配置保存或修改 类型声明 */
export type emailSaveOrUpdateDTO = {
  /** 编号 */
  id?: number;
  /** 邮件服务器SMTP地址 */
  host?: string;
  /** 密码 */
  password?: string;
  /** 	邮件服务器SMTP端口 */
  port?: string;
  /** 发件人邮箱	 */
  senderEmail?: string;
  /** 	发件人名称 */
  senderUser?: string;
};

/** 邮件发送 类型声明 */
export type emailSendDTO = {
  /** 正文 */
  content?: string;
  /** 主题 */
  subject?: string;
  /** 收件人邮箱 */
  tos?: string;
};

