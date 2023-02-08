import { http } from "@/utils/http"
import { baseUrlApi } from "@/api/utils"
import {
  departmentListTreeDTO,
  departmentListTreeVO,
  departmentRemoveOneDTO,
  departmentSaveOneDTO,
  departmentUpdateOneDTO
} from "@/api/interface/department";
import {isEmpty} from "@/globalType";

/** 查询部门树 */
export const departmentListTree = (params?: departmentListTreeDTO) => {
  return http.request<departmentListTreeVO>("get", baseUrlApi("/department/list_tree"), {
    params
  })
}

/** 部门删除 */
export const departmentRemoveOne = (params?: departmentRemoveOneDTO) => {
  return http.request<isEmpty>("delete", baseUrlApi("/department/remove_one"), {
    params
  })
}

/** 部门新增 */
export const departmentSaveOne = (data?: departmentSaveOneDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/department/save_one"), {
    data
  })
}

/** 部门更新 */
export const departmentUpdateOne = (data?: departmentUpdateOneDTO) => {
  return http.request<isEmpty>("put", baseUrlApi("/department/update_one"), {
    data
  })
}
