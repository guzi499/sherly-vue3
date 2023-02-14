import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  operationLogGetOneDTO,
  operationLogGetOneVO,
  operationLogListPageDTO,
  operationLogListPageVO
} from "@/api/interface/operation_log";

/** 操作日志分页 */
export const operationLogListPage = (params?: operationLogListPageDTO) => {
  return http.request<operationLogListPageVO>("get", baseUrlApi("/operation_log/list_page"), {
    params
  });
};

/** 操作日志详情 */
export const operationLogGetOne = (params?: operationLogGetOneDTO) => {
  return http.request<operationLogGetOneVO>("get", baseUrlApi("/operation_log/get_one"), {
    params
  });
};

/** 操作日志清空 */
export const operationLogRemoveAll = (params?: isEmpty) => {
  return http.request<isEmpty>("delete", baseUrlApi("/operation_log/remove_all"), {
    params
  });
};

