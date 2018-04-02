/* eslint-disable no-undef */
const Koa = require('koa');
const Router = require('koa-router');
const { getDiscList } = require('./api')

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

router.get('/getDiscList', async (ctx, next) => {
  const res = await getDiscList(ctx.request.query)
  ctx.response.body = res.data
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080)

console.log('app running on port 8080')
