const Op = require('sequelize').Op
const {
  admin_role,
  admin_user
} = require('../model')

function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Admin_user_role {
  /**
   * 创建|修改用户角色关联
   * @param   {object} ctx 上下文对象
   */
  static async admin_user_role_create (ctx) {
    const req_data = ctx.request.body
    try {
      await admin_user.update({
        user_role_ids: req_data.role_id
      }, {
        where: {
          id: id
        }
      })

      ctx.body = {
        state: 'success',
        message: '更新用户角色成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }
}

module.exports = Admin_user_role