const knex = require('../utils/knex')
const { encryptPassword, generateToken } = require('../utils/hash')
const login = (req, res) => {
  try {
    const password = encryptPassword(req.body.password)

    const token = generateToken(req.body.password)

    knex('users')
      .where({ email: req.body.email, password })
      .update({ token })
      .returning(['email', 'token'])
      .then(rows => {
        if (rows.length === 1) {
          res.json(rows[0])
        } else {
          res.json({ error: 'incorrect login or password' })
        }
      })
  } catch (error) {
    res.json({ code: error.code })
  }
}

module.exports = login
