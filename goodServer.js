const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const sessionIdToSessionMap = {};
const port = 8000;

function login(ctx, session) {
  const sessionId = Math.random();
  sessionIdToSessionMap[sessionId] = session;
  // ctx.redirect(`/?sessionId=${sessionId}`);
  ctx.cookies.set('sessionId', sessionId);
  ctx.redirect('/');
}

app
  .use(bodyParser())
  .use(async (ctx) => {
    const { name, pass, amount } = ctx.request.body;
    if (pass === '123' && name.toLowerCase() === 'lena') {
      login(ctx, { name: 'Lena', money: 1000 });
      return;
    }
    if (pass === '456' && name.toLowerCase() === 'vova') {
      login(ctx, { name: 'Vova', money: 0 });
      return;
    }
    if (pass === '789' && name === 'ira') {
      login(ctx, { name: 'Ira', money: 500 });
      return;
    }
    const sessionId = ctx.query.sessionId || ctx.cookies.get('sessionId');
    const session = sessionIdToSessionMap[sessionId];
    if (amount && session) {
      Object
        .values(sessionIdToSessionMap)
        .find((s) => s.name.toLowerCase() === name.toLowerCase())
        .money += Number(amount);
      session.money -= amount;
      ctx.redirect('/');
      return;
    }
    let html = '<h1>Good Site</h1>';
    if (session) {
      html += `<h2> I'm logged in as ${session.name}`;
      html += `<h2> I have ${session.money}$</h2>`;
      html += `<br><a href="/anoter-page?sessionId=${sessionId}">link to another page with sessionId</a><br>`;
      html += '<br><a href="/anoter-page">link to another page without sessionId</a><br><br><br>';
      html += `<form method="post" action="/transfer" style="display: inline-block">
        <fieldset>          
          <input name="name">
          <input name="amount">
          <input type="submit" value="Transfer money">
        </fieldset>
      </form>`;
    } else {
      html += `
    <form method="post" action="/login">
    <fieldset style="display: inline-block">
      <label>name:<input name="name"></label><br><br> 
      <label>password:<input name="pass" type="password"></label><br><br>
      <input type="submit" name="login">
      </fieldset>
     </form><br>
    `;
    }
    ctx.body = html;
  })
  .listen(port, () => {
    console.log(`http://good.site.com:${port}`);
  });
