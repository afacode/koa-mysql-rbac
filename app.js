const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routers = require('./router')

const app = new Koa()

// app.use(koaLogger())
app.use(bodyParser())


// routers(app)
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(8080, () => {
  console.log('服务已经起来在:port 8080')
})
