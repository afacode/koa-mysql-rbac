const md5 = require('md5')
const { admin_user, admin_role } = require('../model')
const { createToken } = require('../middleware/token')
const { admin_system_log_create } = require('./admin_system_log')


function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Admin_user {
  /**
   * 登录操作
   * @param  {object} ctx 上下文对象
   */
  static async admin_user_sign (ctx) {
    let { username, password } = ctx.request.body
    try {
      let admin_user_info = await admin_user.findOne({
        where: {
          username: username
        }
      })
      
      if (!admin_user_info) {
        throw new ErrorMessage('用户不存在!')
      }
      if (admin_user_info.password !== md5(password)) {
        throw new ErrorMessage('密码错误!')
      }


      admin_user.update({
        last_sign_ip: ctx.request.ip,
        login_count: admin_user_info.login_count + 1
      }, {
        where: {id: admin_user_info.id}
      })

      let data = {
        username,
        id: admin_user_info.id ? admin_user_info.id : '10000',
        role_id: admin_user_info.role_ids ? admin_user_info.role_ids : ''
      }

      admin_system_log_create({
        user_id: ctx.request.userinfo.id,
        username: ctx.request.userinfo.username,
        ip: ctx.request.ip || '::1',
        type: 4,
        content: `用户${user_id}-> ${username}管理员登陆`
      })

      let token = await createToken(data)
      ctx.body = {
        state: 'success',
        message: '登录成功',
        token
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 注册操作
   * @param   {object} ctx 上下文对象
   */
  static async admin_user_create (ctx) {
    const { username, password } = ctx.request.body
    try {
      let admin_user_findOne = await admin_user.findOne({
        where: { username: username }
      })
      if (admin_user_findOne) {
        throw new ErrorMessage('账户已存在!')
      }
  
      await admin_user.create({
        username: username,
        password: md5(password),
        reg_ip: ctx.request.ip,
        user_role_ids: 2,
        enable: true
      })
  
      ctx.body = {
        state: 'success',
        message: '创建成功',
        token
      }  
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 更新管理员用户
   * @param   {object} ctx 上下文对象
   */
  static async admin_user_edit (ctx) {

  }

  /**
   * 获取用户列表操作
   * @param   {object} ctx 上下文对象
   */
  static async admin_user_list (ctx) {
    const { page = 1, pageSize = 10 } = ctx.query

    try {
      let { count, rows } = await admin_user.findAndCountAll({
        attributes: [
          'id', 'username', 'phone', 'email', 'reg_ip', 'last_sign_ip', 'login_count', 'role_ids'
        ],
        where: '',
        offset: (page - 1) * Number(pageSize),
        limit: Number(pageSize)
      })
      let role_list = await admin_role.findAll({
        attributes: [
          'role_id', 'role_name', 'role_description', 'auth_ids'
        ]
      })
      ctx.body = {
        state: 'success',
        message: '成功',
        data: {
          count,
          user_list: rows,
          role_list
        }
      }

    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 获取后台用户信息详情
   * @param   {object} ctx 上下文对象
   */
  static async admin_user_info (ctx) {
    const res_data = ctx.request
    try {
      let find_admin_user_info = await admin_user.findOne({
        attributes: [
          'id', 'username', 'phone', 'email', 'reg_ip', 'last_sign_ip', 'login_count', 'created_at'
        ]
      }, {
        where: {
          id: res_data.userinfo.id
        }
      })
      ctx.body = {
        state: 'success',
        message: '成功',
        data: find_admin_user_info
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 删除用户
   * @param   {object} ctx 上下文对象
   * 删除用户先判断管理员角色表中是否有关联，
   * 无关联则直接管理员删除，有关联则开启事务同时删除管理员角色关联表中关联
   * 管理员对角色是一对一的关系
   */
  static async admin_user_delete (ctx) {
    const { id } = ctx.request.body
    try {
      await admin_user.destroy({ where: { id } })
      // 写入日志
      await admin_system_log_create({
        user_id: ctx.request.userInfo.id,
        username: ctx.request.userInfo.username,
        ip: ctx.request.ip,
        type: 3,
        content: `删除用户${id}管理员`
      })
      ctx.body = {
        state: 'success',
        message: '删除管理员用户成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: err.message
      }
    }
  }

}

module.exports = Admin_user