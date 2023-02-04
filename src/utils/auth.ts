export const sessionKey = "user-info";
export const TokenKey = "token";

/** 获取`token` */
export function getToken(): string {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return localStorage.getItem(TokenKey) ? localStorage.getItem(TokenKey) : "";
}

export function setToken(token: string) {
  localStorage.setItem(TokenKey, token);
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  localStorage.removeItem(TokenKey);
}
