const Sequelize = require('sequelize')
const shortid = require('shortid')

/** 
 * 用户表
 */
module.exports = {
  name: 'admin_user',
  table: {
    /**表结构 */
    id: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      defaultValue: shortid.generate
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING(100)
    },
    phone: Sequelize.BIGINT(28),
    email: Sequelize.STRING(36),
    reg_ip: {
      type: Sequelize.STRING(20),
      comment: '注册IP'
    },
    last_sign_ip: {
      type: Sequelize.STRING(20),
      comment: '最近登陆IP'
    },
    description: Sequelize.STRING(100),
    login_count: Sequelize.INTEGER,
    role_ids: {
      type: Sequelize.TEXT('long'),
      comment: '用户角色id列表'
    }
  }
}
