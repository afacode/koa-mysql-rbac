const jwt = require('jsonwebtoken')
const { token_secret } = require('../config/token')

class Token {
  // token 验证
  static async verifyToken (ctx, next) {
    let token = ctx.header['access-token'] || ctx.cookies.get('access-token') || ctx.request.body.access_token || ctx.query.access_token

    if (token) {
      // 存在token，解析token
      try {
        ctx.request.userinfo = await jwt.verify(token, token_secret)
        await next()
      } catch (err) {
        ctx.body = {
          state: 'error',
          message: '请登录'
        }
      }
    } else {
      ctx.body = {
        state: 'error',
        message: '请登录'
      }
    }
  }

  /** 
   * 生成token
   */
  static async createToken (data) {
    return jwt.sign(data, token_secret, {expiresIn: 60*60*24*7})
  }
}


module.exports = Token