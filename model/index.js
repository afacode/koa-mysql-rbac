const Sequelize = require('sequelize')
const config = require('../config/db')

const sequelize = new Sequelize(
  config.database, 
  config.username,
  config.password,
  {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    port: config.port,
    host: config.host,
    timezone: '+08:00',
    pool: {
      max: 5, // 连接池中最大连接数量
      min: 0,
      // acquire: 30000,
      idle: 10000 //如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
      freezeTableName: true //表名不主动加s
    }
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log('数据库连接失败:' + err)
  })

const tables = require('./load_db')(sequelize)

module.exports = {
  sequelize,
  ...tables
}