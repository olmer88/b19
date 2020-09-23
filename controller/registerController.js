const crypto = require('crypto');
const knex = require('../knex');

module.exports = async (ctx) => {
  // create user in DB
  const { body } = ctx.request;
  const password = crypto.createHash('md5').update(body.password).digest('hex');
  await knex('users').insert({ name: body.name, password });
  // login user
  ctx.redirect('back');
};
