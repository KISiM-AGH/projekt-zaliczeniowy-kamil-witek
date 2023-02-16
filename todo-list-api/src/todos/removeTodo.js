const knex = require('../utils/knex')
const removeTodo = (req, res) => {
  const token = req.headers?.authorization || ''
  knex('users')
    .where({ token })
    .select(['id', 'email'])
    .then(row => {
      if (row.length === 1) {
        knex('todos')
          .where({ id: req.params.id })
          .delete()
          .then(row => {
            res.json({ id: req.params.id })
          })
      } else {
        res.json({
          error: 'uncorrect token',
        })
      }
    })
}

module.exports = removeTodo
