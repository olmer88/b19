const listManager = require('../managers/listsManager');

async function addListAction(ctx) {
  const { name } = ctx.request.body;
  const { userId } = ctx.session.user;
  await listManager.addList({ name, userId });
  ctx.redirect('/');
}

module.exports = { addListAction };
