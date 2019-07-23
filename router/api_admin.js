const Router = require('koa-router')
const { verifyToken } = require('../middleware/token')
const Verify_auth = require('../middleware/verify_auth')

const Admin_user = require('../controller/admin_user')
const Admin_role = require('../controller/admin_role')
const Admin_auth = require('../controller/admin_auth')
const Admin_role_auth = require('../controller/admin_role_auth')
const Admin_user_role = require('../controller/admin_user_role')
const router = new Router()

/**
 * 管理员用户
 */
router.post('/sign', Admin_user.admin_user_sign) // 登陆

router.post(
  '/admin_user/create', 
  verifyToken,
  // verifyAuthority.AdminCheck, 
  Admin_user.admin_user_create
) // 创建

router.post(
  '/admin_user/edit', 
  verifyToken,
  Verify_auth.check_auth, 
  Admin_user.admin_user_edit
)  // 更新
router.post(
  '/admin_user/delete', 
  verifyToken,
  // verifyAuthority.AdminCheck, 
  Admin_user.admin_user_delete
) // 删除管理员用户
router.post('/admin_user/info', verifyToken, Admin_user.admin_user_info) // 获取管理员用户信息
router.get('/admin_user/list', verifyToken, Admin_user.admin_user_list) // 获取管理员用户列表


/**
 * 角色
 */
router.post('/admin_role/create', Admin_role.admin_role_create) // 创建角色
router.post('/admin_role/delete', Admin_role.admin_role_delete) // 删除角色
router.post('/admin_role/edit', Admin_role.admin_role_edit) // 修改角色
router.get('/admin_role/list', Admin_role.admin_role_list) // 角色列表
router.get('/admin_role/all', Admin_role.admin_role_all) // 角色列表
/**
 * 后台用户与角色权限关联
 */
router.get('/admin_user_role/create', Admin_user_role.admin_user_role_create) 
// 创建 | 修改用户角色关联


/**
 * 权限
 */
router.post('/admin_auth/create', Admin_auth.admin_auth_create) // 创建权限
router.post('/admin_auth/update', Admin_auth.admin_auth_update) // 更新权限
router.post('/admin_auth/delete', Admin_auth.admin_auth_delete) // 删除权限
router.get('/admin_auth/list', Admin_auth.admin_auth_list) // 权限列表


/**
 * 后台角色与权限关联
 */
router.get('/admin_role_auth/set', Admin_role_auth.admin_role_auth_set) // 设置后台角色权限


module.exports = router