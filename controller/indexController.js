const knex = require('../knex');

const sessionCookieName = 'sessionId';
const sessionIdToSessionDataMap = {};
const userIdToUserMap = {
  123: { name: 'John', age: 31, password: '456' },
  987: { name: 'Gretta', age: 14, password: 'apple' },
};

function login({ name, password, session }) {
  const id = Object.keys(userIdToUserMap).find((userId) => {
    const user = userIdToUserMap[userId];
    return user.password === password && user.name === name;
  });
  // eslint-disable-next-line no-param-reassign
  if (id) session.userId = id;
}

function getSession(ctx) {
  let sessionId = ctx.cookies.get(sessionCookieName);
  if (!sessionId) {
    sessionId = Math.random();
    ctx.cookies.set(sessionCookieName, sessionId);
  }
  if (!sessionIdToSessionDataMap[sessionId]) sessionIdToSessionDataMap[sessionId] = {};
  return sessionIdToSessionDataMap[sessionId];
}

module.exports = async (ctx) => {
  const session = getSession(ctx);
  login({ ...ctx.request.body, session });
  const res = await knex.raw('Select 1 + 1');
  session.someVal = (session.someVal || 0) + 1;
  await ctx.render('index', {
    counter: session.someVal,
    age: (userIdToUserMap[session.userId] || {}).age,
    sqlRes: res,
  });
};
