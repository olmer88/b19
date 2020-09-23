const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const indexController = require('./controller/indexController');
const registerController = require('./controller/registerController');

const app = new Koa();
const router = new Router();

router
  .post('/register', registerController)
  .get('/', indexController);
app
  .use(bodyParser())
  .use(router.routes());

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
});
const port = 8000;
app.listen(port, () => {
  console.log(`http://notepad.com:${port}`);
});
