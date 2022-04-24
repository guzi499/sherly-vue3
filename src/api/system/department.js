import request from '@/utils/request'

// 获取部门树
export function getDepartmentTree (data) {
  return request({
    url: '/department/list/tree',
    method: 'get',
    query: data
  })
}

// 新增部门
export function addDepartment (data) {
  return request({
    url: '/department/save/one',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDepartment (data) {
  return request({
    url: '/department/update/one',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDepartment (departmentId) {
  return request({
    url: '/department/remove/one?departmentId=' + departmentId,
    method: 'delete'
  })
}
