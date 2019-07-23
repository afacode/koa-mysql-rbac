const Router = require('koa-router')

const router = new Router()

const apiUser = require('./api_admin')
const { pre_url, version } = require('../config/base')



router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

router.use(
  `${pre_url}${version}`,
  apiUser.routes(),
  apiUser.allowedMethods()
)

module.exports = router