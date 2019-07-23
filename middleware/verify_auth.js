const { admin_auth, admin_role } = require('../model')
const Op = require('sequelize').Op
const { pre_url, version } = require('../config/base')


function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class Verify_auth {
  static async check_auth (ctx, next) {
    const { url, userinfo = {} } = ctx.request
    const { role_id } = userinfo
    var admin_user_auth_sign_list = []
    // 超级管理员
    if (role_id === '1000000') {
      await next()
    }
    if (role_id && role_id !== '1000000') {
      let request_url = ''
      if (url.indexOf('?') > 0) {
        request_url = url.split('?')[0]
      } else {
        request_url = url
      }

      let real_url = request_url.split(`${pre_url}${version}`)[1]
      // 查看本地是否有此用户的权限请求结构 1.查看是否有此用户ID 2.查看是否有此权限路由
      // admin_user_auth_sign_list[userinfo.id].includes[real_url]
      if (userinfo.id !== admin_user_auth_sign_list[userinfo.id]) {
        try {
          // 查看是否有此路由
          let find_auth_url = await admin_auth.findOne({
            where: {
              auth_url: request_url.split(`${pre_url}${version}`)[1]
            }
          })
          if (find_auth_url) {
            // 查看有此角色 
            let find_role = await admin_role.findOne({
              where: { role_id: role_id }
            })
  
            if (find_role.auth_ids.includes(find_auth_url.auth_id)) {
              // 将请求权限放在user_id的数组对象里面 todo
              await next()

            } else {
              throw new ErrorMessage('当前用户无权限!')
            }
          } else { 
            throw new ErrorMessage('当前用户无权限!')
          }
        } catch (err) {
          ctx.body = {
            state: 'error',
            message: '当前用户无权限'
          }
        }
      } else {
        if (admin_user_auth_sign_list[userinfo.id].includes[real_url]) {
          await next()
        } else {
          throw new ErrorMessage('当前用户无权限!')
        }
      }
    } else {
      ctx.body = {
        state: 'error',
        message: '当前用户无任何操作权限'
      }
    }
  }
}

module.exports = Verify_auth