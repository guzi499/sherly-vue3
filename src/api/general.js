import request from '@/utils/request'
/**获取公共菜单下拉框 */
export function getMenuList(data) {
  return request({
    url: '/generic/basic/menu',
    method: 'get',
    data: data
  })
}

/**获取公共部门下拉框 */
export function getDepartmentList (data) {
  return request({
    url: '/generic/basic/department',
    method: 'get',
    data: data
  })
}

/**获取公共角色下拉框 */
export function getRoleList (data) {
  return request({
    url: '/generic/basic/role',
    method: 'get',
    data: data
  })
}
