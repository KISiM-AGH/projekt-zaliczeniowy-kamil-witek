const knex = require('../utils/knex')
const createTodo = (req, res) => {
  const token = req.headers.authorization
  knex('users')
    .where({ token })
    .select(['id', 'email'])
    .then(row => {
      if (row.length === 1) {
        const userId = row[0]?.id
        knex('todos')
          .insert({ text: req.body.text, userId })
          .returning(['id', 'text', 'userId'])
          .then(row => {
            res.json(row)
          })
      }
    })
}

module.exports = createTodo
