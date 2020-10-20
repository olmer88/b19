const _ = require('lodash');

module.exports = async (ctx) => {
  // console.log('user from jwt:', ctx.state.user);
  await ctx.render('index', {
    userName: _.get(ctx.session, ['user', 'name'], ''),
  });
};
