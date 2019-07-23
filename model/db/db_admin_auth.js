const Sequelize = require('sequelize')
const shortid = require('shortid')

/**
 * 权限表
 */
module.exports = {
  name: 'admin_auth',
  table: {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id 主键，自增'
    },
    auth_id: {
      type: Sequelize.STRING(20),
      comment: '权限ID',
      defaultValue: shortid.generate,
    },
    auth_name: Sequelize.CHAR(100),
    auth_description: Sequelize.STRING(100),
    auth_father_id: {
      type: Sequelize.STRING(20),
      comment: '权限父ID',
    },
    auth_father_name: Sequelize.CHAR(100),
    auth_url: {
      type: Sequelize.CHAR(100),
      comment: '权限树的连接路径'
    },
    auth_sort: {
      type: Sequelize.INTEGER(20),
      comment: '权限树的排序'
    },
    auth_type: {
      type: Sequelize.CHAR(100),
      comment: '权限类型'
    },
    enable: {
      type: Sequelize.BOOLEAN,
      comment: '是否可以显示'
    }

  }
}