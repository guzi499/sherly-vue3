import request from '@/utils/request'

// 获取权限树
export function getPermissionTree (data) {
  return request({
    url: 'permission/list/tree',
    method: 'get',
    query: data
  })
}

// 权限下拉框
export function getPermissionSelect (data) {
  return request({
    url: 'generic/basic/permission',
    method: 'get',
    data: data
  })
}

// 新增权限
export function addPermission (data) {
  return request({
    url: 'permission/save/one',
    method: 'post',
    data: data
  })
}

// 修改权限
export function updatePermission (data) {
  return request({
    url: '/permission/update/one',
    method: 'put',
    data: data
  })
}

// 删除权限
export function delPermission (permissionId) {
  return request({
    url: '/permission/remove/one?permissionId=' + permissionId,
    method: 'delete'
  })
}
