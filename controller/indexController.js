const _ = require('lodash');
const listManager = require('../managers/listsManager');

module.exports = async (ctx) => {
  const userId = _.get(ctx.session, ['user', 'userId']);
  const lists = await listManager.getAllForUser(userId);

  await ctx.render('index', {
    userName: _.get(ctx.session, ['user', 'name'], ''),
    lists,
  });
};
