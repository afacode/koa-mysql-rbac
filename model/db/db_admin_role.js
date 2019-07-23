const Sequelize = require('sequelize')

/**
 * 角色表
 */
module.exports = {
  name: 'admin_role',
  table: {
    role_id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id 主键，自增'
    },
    role_name: Sequelize.STRING(100),
    role_description: Sequelize.STRING(100),
    auth_ids: {
      type: Sequelize.TEXT('long'),
      comment: '角色权限id列表'
    }
  }
}

