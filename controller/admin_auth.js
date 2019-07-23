const Op = require('sequelize').Op
const {
  admin_role,
  admin_user,
  admin_auth
} = require('../model')

function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Admin_auth {
  /**
   * --------------权限操作---------------------
   * 创建权限
   * @param   {object} ctx 上下文对象
   */
  static async admin_auth_create (ctx) {
    const { auth_name, auth_url } = ctx.request.body 
    const req_data = ctx.request.body
    try {
      let find_auth_name = await admin_auth.findOne({
        where: {
          auth_name: auth_name
        }
      })
      if (find_auth_name) {
        throw new ErrorMessage('权限名已存在!')
      }

      let find_auth_url = await admin_auth.findOne({
        where: {
          auth_url: auth_url
        }
      })
      if (find_auth_url) {
        throw new ErrorMessage('权限路径已存在!')
      }

      await admin_auth.create({
        ...req_data
      })

      ctx.body = {
        state: 'success',
        message: auth_name + '权限创建成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 获取权限列表
   * @param   {object} ctx 上下文对象
   */
  static async admin_auth_list (ctx) {
    try {
      let admin_auth_all = await admin_auth.findAll()

      ctx.body = {
        state: 'success',
        message: '成功',
        data: admin_auth_all
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 修改权限
   * @param   {object} ctx 上下文对象
   */
  static async admin_auth_update (ctx) {
    const {
      auth_id,
      auth_name,
      auth_description,
      auth_url,
      auth_type,
      auth_father_id,
      auth_father_name,
      auth_sort,
      enable
    } = ctx.request.body
    try {
      await admin_auth.update({
        auth_name: auth_name,
        auth_url: auth_url,
        auth_sort: auth_sort,
        auth_father_id: auth_father_id,
        auth_father_name: auth_father_name,
        auth_type: auth_type,
        auth_description: auth_description,
        enable: enable
      }, {
        where: {
          auth_id: auth_id
        }
      })

      ctx.body = {
        state: 'success',
        message: '更新权限成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }
  
  /**
   * 删除权限列表(删除自身及下属权限)
   * @param   {object} ctx 上下文对象
   */
  static async admin_auth_delete (ctx) {
    const { auth_id_arr } = ctx.request.body
    try {
      await admin_auth.destroy({
        where: {
          auth_id: {
            [Op.in]: auth_id_arr
          }
        }
      })
      ctx.body = {
        state: 'success',
        message: '删除权限树成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }
}

module.exports = Admin_auth