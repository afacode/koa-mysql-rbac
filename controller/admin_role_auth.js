const Op = require('sequelize').Op
const {
  admin_role
} = require('../model')

function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Admin_role_auth {  
  /**
   * 设置角色权限关联
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_auth_set (ctx) {
    const req_data = ctx.request.body
    try {
      await admin_role.update({
        admin_auth_ids: req_data.role_auth_list_all.join(',')
      }, {
        where: {
          role_id: req_data.role_id
        }
      })

      ctx.body = {
        state: 'success',
        message: '成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }
}

module.exports = Admin_role_auth