const { sequelize, admin_auth, admin_user, admin_role } = require('./index')
const admin_auth_init = require('../lib/admin_auth_list')
const admin_role_init = require('../lib/admin_role_list')
const admin_user_init = require('../lib/admin_user_list')

// 一次同步所有模型
// 注意:如果表已经存在,使用`force:true`将删除该表
sequelize.sync({
  force: true
}).then(() => {
  admin_user.bulkCreate(admin_user_init).then(() => {
    console.log('用户初始化完成')
  })
  admin_role.bulkCreate(admin_role_init).then(() => {
    console.log('角色初始化完成')
  })
  admin_auth.bulkCreate(admin_auth_init).then(() => {
    console.log('权限初始化完成')
  })
})
console.log('数据表创建成功')