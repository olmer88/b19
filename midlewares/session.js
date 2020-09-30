const session = require('koa-session');
const MemcachePlus = require('memcache-plus');

const client = new MemcachePlus('localhost');

const store = {
  get(key) {
    return client.get(key);
  },
  async set(key, sess) {
    await client.delete(key);
    return client.add(key, sess, 60 * 60 * 24);
  },
  async destroy(key) {
    return client.delete(key);
  },
};
const sessionConfig = { signed: false, store };
module.exports = (app) => app.use(session(sessionConfig, app));
