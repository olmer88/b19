const crypto = require('crypto');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const qs = require('query-string');
const fetch = require('node-fetch');
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
    const token = jwt.sign(_.pick(user, ['userId', 'name']), 'super-secret');
    ctx.cookies.set('jwt', token);
    ctx.redirect('/');
    return;
  }
  await ctx.render('login');
};
const clientId = 684614608824823;
const loginView = async (ctx) => {
  const stringifiedParams = qs.stringify({
    client_id: clientId,
    redirect_uri: 'https://6b06630f409e.ngrok.io/authenticate/facebook/',
    scope: ['email'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });
  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  await ctx.render('login', { facebookLoginUrl });
};
const logout = (ctx) => {
  ctx.session = {};
  ctx.redirect('/');
};

async function getAccessTokenFromCode(code) {
  const queryStr = qs.stringify({
    client_id: clientId,
    client_secret: 'bfce3ed4969e5f81109386805c2c331a',
    redirect_uri: 'https://6b06630f409e.ngrok.io/authenticate/facebook/',
    code,
  });
  const response = await fetch(`https://graph.facebook.com/v4.0/oauth/access_token?${queryStr}`);
  const data = await response.json();
  console.log(data); // { access_token, token_type, expires_in }
  return data.access_token;
}

async function getFacebookUserData(accessToken) {
  const queryStr = qs.stringify({
    fields: ['id', 'email', 'first_name', 'last_name'].join(','),
    access_token: accessToken,
  });
  const response = await fetch(`https://graph.facebook.com/me?${queryStr}`);
  const data = await response.json();
  console.log(data); // { id, email, first_name, last_name }
  return data;
}

async function authenticateFacebook(ctx) {
  const accessToken = await getAccessTokenFromCode(ctx.query.code);
  await getFacebookUserData(accessToken);
  ctx.redirect('/');
}

module.exports = {
  register, login, logout, loginView, authenticateFacebook,
};
