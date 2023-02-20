/** 查询部门树 类型声明 */
export type DepartmentListTreeVO = {
  children?: Array<DepartmentListTreeVO[]>;
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
  sort?: number;
};

/** 部门删除 类型声明 */
export type DepartmentRemoveOneDTO = {
  /** 部门id */
  departmentId?: number;
};

/** 部门新增 类型声明 */
export type DepartmentSaveOneDTO = {
  /** 部门名称 */
  departmentName?: string;
  /** 描述 */
  description?: string;
  /** 父部门编号 */
  parentId?: number;
  /** 排序 */
  sort?: number;
};

/** 部门更新 类型声明 */
export type DepartmentUpdateOneDTO = {
  /** 部门id */
  departmentId?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 描述 */
  description?: string;
  /** 父部门编号 */
  parentId?: number;
  /** 排序 */
  sort?: number;
};
