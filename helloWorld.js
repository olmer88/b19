const Koa = require('koa');

const app = new Koa();

// logger

app
  .use(async (ctx, next) => {
    console.log('subdomains', ctx.request.subdomains);
    await next();
    const responseTime = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${responseTime}`);
  });

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(80);
app.on('error', (err) => {
  console.error('server error', err.message);
});
