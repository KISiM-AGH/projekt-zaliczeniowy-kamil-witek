const knex = require('../utils/knex')
const updateTodo = (req, res) => {
  const token = req.headers?.authorization || ''
  knex('users')
    .where({ token })
    .select(['id', 'email'])
    .then((row) => {
      if (row.length === 1) {
        knex('todos')
          .where({ id: req.params.id })
          .update({text: req.body.text})
          .returning(['text', "id", "userId"])
          .then((row) => {
            res.json(row[0])
          })
      } else {
        res.json({
          error: 'uncorrect token',
        })
      }
    })
}

module.exports = updateTodo
