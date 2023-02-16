const knex = require('./knex')
const schema = () => {
  knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      knex.schema
        .createTable('users', table => {
          table.increments('id')
          table.text('email').notNullable().unique()
          table.text('password').notNullable()
          table.text('token')
        })
        .then(() => {})
    }
    console.log('Table users created.')
  })

  knex.schema.hasTable('todos').then(exists => {
    if (!exists) {
      knex.schema
        .createTable('todos', table => {
          table.increments('id')
          table.text('text')
          table.integer('userId').notNullable()
          table.foreign('userId').references('id').inTable('users')
        })
        .then(() => {})
    }
    console.log('Table todos created.')
  })
}

module.exports = schema
