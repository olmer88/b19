const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());
const sessionCookieName = 'sessionId';

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
});
const sessionIdToSessionDataMap = {};
const userIdToUserMap = {
  123: { name: 'John', age: 31, password: '456' },
  987: { name: 'Gretta', age: 14, password: 'apple' },
};
function getSession(ctx) {
  let sessionId = ctx.cookies.get(sessionCookieName);
  if (!sessionId) {
    sessionId = Math.random();
    ctx.cookies.set(sessionCookieName, sessionId);
  }
  if (!sessionIdToSessionDataMap[sessionId]) sessionIdToSessionDataMap[sessionId] = {};
  return sessionIdToSessionDataMap[sessionId];
}

function login({ name, password, session }) {
  const id = Object.keys(userIdToUserMap).find((userId) => {
    const user = userIdToUserMap[userId];
    return user.password === password && user.name === name;
  });
  // eslint-disable-next-line no-param-reassign
  if (id) session.userId = id;
}

app.use(async (ctx) => {
  const session = getSession(ctx);
  console.log('ctx.request.body', ctx.request.body);

  login({ ...ctx.request.body, session });

  session.someVal = (session.someVal || 0) + 1;
  ctx.render('index', {
    counter: session.someVal,
    age: (userIdToUserMap[session.userId] || {}).age,
  });
});

app.listen(80, () => {
  console.log('http://notepad.com');
});
