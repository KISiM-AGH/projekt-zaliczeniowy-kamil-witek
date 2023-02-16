const knex = require('../utils/knex')
const getTodo = (req, res) => {
  const token = req.headers?.authorization || ""
  knex('users')
    .where({ token })
    .select(['id', 'email'])
    .then((row) => {
      if (row.length === 1) {
        const userId = row[0]?.id
        knex('todos')
          .where({ userId })
          .then((row) => {
            res.json(row)
          })
      } else {
        res.json({
            error: 'uncorrect token'
        })
      }
    })
}

module.exports = getTodo
