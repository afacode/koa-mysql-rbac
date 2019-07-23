const Sequelize = require('sequelize')
const shortid = require('shortid')

module.exports = {
  name: 'user',
  table: {
    /**表结构 */
    uid: {
      type: Sequelize.STRING(20),
      primaryKey: true, // 主键
      defaultValue: shortid.generate()
    },
    username: {
      type: Sequelize.STRING
    },
    introduction: {
      type: Sequelize.TEXT,
      comment: '简介'
    },
    phone: Sequelize.BIGINT(28),
    email: {
      type: Sequelize.STRING(36)
    },
    sex: Sequelize.INTEGER(6),
    password: Sequelize.STRING(255),
    reg_ip: Sequelize.STRING(25),
    last_sign_ip: Sequelize.STRING(25),
    enable: Sequelize.BOOLEAN,
    count: {
      type: Sequelize.INTEGER,
      comment: '登录次数'
    }

  }
}