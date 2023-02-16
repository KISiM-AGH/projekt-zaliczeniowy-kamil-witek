const cryptojs = require('crypto-js')

const encryptPassword = password => {
  return cryptojs.SHA256(password, process.env.KEY).toString()
}

const generateToken = password => {
  return cryptojs
    .SHA256(password + new Date().toISOString(), process.env.HASH)
    .toString()
}

module.exports = { encryptPassword, generateToken }
