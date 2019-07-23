module.exports = (sequelize) => {
  const user = sequelize.define(/* 用户表 */
    require('./db/db_user').name,
    require('./db/db_user').table
  )
  /** 后台用户角色表 */
  const admin_role = sequelize.define(
    require('./db/db_admin_role').name,
    require('./db/db_admin_role').table
  )
  /** 后台用户表 */
  const admin_user = sequelize.define(
    require('./db/db_admin_user').name,
    require('./db/db_admin_user').table
  )
  /** 权限表 */
  const admin_auth = sequelize.define(
    require('./db/db_admin_auth').name,
    require('./db/db_admin_auth').table
  )

  const admin_system_log = sequelize.define(
    require('./db/db_admin_system_log').name,
    require('./db/db_admin_system_log').table
  )
  const tables = {
    user,
    admin_auth,
    admin_role,
    admin_user,
    admin_system_log
  }
  
  return {
    ...tables
  }
}
