const crypto = require('crypto');
const knex = require('../knex');

const makeHash = (password) => crypto.createHash('md5').update(password).digest('hex');

const register = async (ctx) => {
  // create user in DB
  const { body } = ctx.request;
  const password = makeHash(body.password);
  const { name } = body;
  const [userId] = await knex('users').insert({ name, password });
  // login user
  ctx.session.user = { name, userId };
  ctx.redirect('/');
};
const login = async (ctx) => {
  const { body } = ctx.request;
  const password = makeHash(body.password);
  const { name } = body;
  const [user] = await knex('users').where({ name, password });
  if (user) {
    ctx.session.user = user;
    ctx.redirect('/');
    return;
  }
  await ctx.render('login');
};
const loginView = async (ctx) => {
  await ctx.render('login');
};
const logout = (ctx) => {
  ctx.session = {};
  ctx.redirect('/');
};
module.exports = {
  register, login, logout, loginView,
};
