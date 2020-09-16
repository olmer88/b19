const knex = require('knex');

module.exports = knex({
  client: 'mysql',
  connection: { database: 'b19', user: 'newuser', password: 'password' },
});
