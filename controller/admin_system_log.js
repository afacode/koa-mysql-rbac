const Op = require('sequelize').Op
const {
  admin_system_log
} = require('../model')

class Admin_system_log {
  /**
   * 创建后台日志
   * @param   {object} ctx 上下文对象
   */
  static async admin_system_log_create ({user_id, ip, type, content, username}) {
    return admin_system_log.create({
      user_id, username, ip, content, type
    })
  }
}

module.exports = Admin_system_log
