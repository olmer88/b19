const _ = require('lodash');

module.exports = async (ctx) => {
  await ctx.render('index', {
    userName: _.get(ctx.session, ['user', 'name'], ''),
  });
};
