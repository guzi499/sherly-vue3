/** 查询部门树 类型声明 */
export type departmentListTreeVO = {
  children?: Array<departmentListTreeVO>;
  /** 创建时间 */
  createTime?: string;
  /** 部门编号 */
  departmentId?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 描述 */
  description?: string;
  /** 父部门编号 */
  parentId?: number;
  /** 排序 */
  sort?: number
}

/** 部门删除 类型声明 */
export type departmentRemoveOneDTO = {
  /** 部门id */
  departmentId?: number
}

/** 部门新增 类型声明 */
export type departmentSaveOneDTO = {
  /** 部门名称 */
  departmentName?: string;
  /** 描述 */
  description?: string;
  /** 父部门编号 */
  parentId?: number;
  /** 排序 */
  sort?: number
}

/** 部门更新 类型声明 */
export type departmentUpdateOneDTO = {
  /** 部门id */
  departmentId?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 描述 */
  description?: string;
  /** 父部门编号 */
  parentId?: number;
  /** 排序 */
  sort?: number
}
