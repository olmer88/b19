const knex = require('./knex');

/**
 * @param data
 * @param data.name
 * @param data.userId
 * @return {Promise<*>}
 */
async function addList(data) {
  const [listId] = await knex('lists').insert(data);
  return listId;
}

module.exports = {
  addList,
  getAllForUser: (userId = null) => knex('lists').where({ userId }),
};
