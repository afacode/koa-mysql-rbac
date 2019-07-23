const Sequelize = require('sequelize')

/**
 * 后台日志
 */
module.exports = {
  name: 'admin_system_log',
  table: {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id 主键，自增'
    },
    user_id: Sequelize.STRING(20),
    username: Sequelize.STRING(100),
    ip: Sequelize.STRING(20),
    type: {
      type: Sequelize.INTEGER(10),
      comment: '类型 1:创建,2:更新,3:删除,4:登录'
    },
    content: Sequelize.STRING(100)   
  }
}

