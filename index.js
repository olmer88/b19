const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
});

app.use(async (ctx) => {
  ctx.render('index');
});

app.listen(80);
