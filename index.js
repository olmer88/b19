const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const jwt = require('koa-jwt');
const session = require('./midlewares/session');
const indexController = require('./controller/indexController');
const registerController = require('./controller/registerController');

const app = new Koa();
const router = new Router();

router
  .post('/register', registerController.register)
  .get('/login', registerController.loginView)
  .post('/login', registerController.login)
  .get('/logout', registerController.logout)
  .get('/', indexController);
session(app)
  .use(bodyParser())
  .use(jwt({ secret: 'super-secret', passthrough: true, cookie: 'jwt' }))
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
