import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  OperationLogGetOneDTO,
  OperationLogGetOneVO,
  OperationLogListPageDTO,
  OperationLogListPageVO
} from "@/api/interface/operation_log";

/** 操作日志分页 */
export const operationLogListPage = (params?: OperationLogListPageDTO) => {
  return http.request<OperationLogListPageVO>(
    "get",
    baseUrlApi("/operation_log/list_page"),
    {
      params
    }
  );
};

/** 操作日志详情 */
export const operationLogGetOne = (params?: OperationLogGetOneDTO) => {
  return http.request<OperationLogGetOneVO>(
    "get",
    baseUrlApi("/operation_log/get_one"),
    {
      params
    }
  );
};

/** 操作日志清空 */
export const operationLogRemoveAll = (params?: isEmpty) => {
  return http.request<isEmpty>(
    "delete",
    baseUrlApi("/operation_log/remove_all"),
    {
      params
    }
  );
};
