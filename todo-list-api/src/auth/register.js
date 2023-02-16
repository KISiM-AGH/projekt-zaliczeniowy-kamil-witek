const knex = require('../utils/knex')
const { encryptPassword } = require('../utils/hash')
const register = (req, res) => {
  try {
    const password = encryptPassword(req.body.password)

    knex('users')
      .insert({ email: req.body.email, password })
      .then(row => {
        res.json({ inserted: true })
      })
  } catch (error) {
    res.json({ code: error.code })
  }
}

module.exports = register
