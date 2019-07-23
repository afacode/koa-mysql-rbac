const Op = require('sequelize').Op
const {
  admin_role
} = require('../model')

function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Admin_role {
  /**
   * -----------------------------------角色操作--------------------------------
   * 创建角色
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_create (ctx) {
    const { role_name, role_description } = ctx.request.body
    try {
      if (!role_name) {
        throw new ErrorMessage('请输入角色名!')
      }
      if (!role_description) {
        throw new ErrorMessage('请输入角色介绍!')
      }
  
      let find_role = await admin_role.findOne({
        where: {role_name}
      })
  
      if (find_role) {
        throw new ErrorMessage('角色已存在!')
      }
  
      await admin_role.create({
        role_name,
        role_description
      })

      ctx.body = {
        state: 'success',
        message: '角色创建成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息:' + err.message
      }
    }
  }

  /**
   * 修改角色
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_edit (ctx) {
    const { role_name, role_description, role_id } = ctx.request.body
    try {
      await admin_role.update({
        role_name: role_name,
        role_description: role_description
      }, {
        where: {
          role_id: role_id // 查询条件
        }
      })

      ctx.body = {
        state: 'success',
        message: '修改角色成功'
      }

    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息:' + err.message
      }
    }
  }

  /**
   * 删除角色
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_delete (ctx) {
    const { role_id } = ctx.request.body
    try {
      await admin_role.destroy({ where: { role_id } })
      return ctx.body = {
        state: 'success',
        message: '删除角色成功'
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
    }
  }

  /**
   * 获取角色列表
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_list (ctx) {
    const { page = 1, pageSize = 10 } = ctx.query
    try {
      let { count, rows } = await admin_role.findAndCountAll({
        attributes: [
          'role_id', 'role_name', 'role_description', 'auth_ids', 'created_at'
        ],
        where: '', // 为空，获取全部，也可以自己添加条件
        offset: (page - 1) * Number(pageSize), // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: Number(pageSize)
      })

      return ctx.body = {
        state: 'success',
        message: '成功',
        data: {
          count: count,
          list: rows
        }
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
      return false
    }
  }

  /**
   * 获取全部角色
   * @param   {object} ctx 上下文对象
   */
  static async admin_role_all (ctx) {
    try {
      let admin_role_all = await admin_role.findAll({
        attributes: [
          'role_id', 'role_name', 'role_description', 'created_at'
        ]
      })
      return ctx.body = {
        state: 'success',
        message: '成功',
        data: admin_role_all
      }
    } catch (err) {
      ctx.body = {
        state: 'error',
        message: '错误信息：' + err.message
      }
      return false
    }
  }

}

module.exports = Admin_role