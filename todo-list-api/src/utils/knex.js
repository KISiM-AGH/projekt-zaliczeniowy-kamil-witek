const knex = require('knex')

const kknex = knex({
  client: 'pg',
  version: '15',
  connection: {
    host: 'localhost',
    port: 5434,
    user: 'postgres',
    password: '1234',
    database: 'todos',
  },
  debug: false,
  pool: {
    min: 1,
    max: 2,
  },
})

module.exports = kknex
