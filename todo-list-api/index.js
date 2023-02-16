const express = require('express')
const register = require('./src/auth/register')
const login = require('./src/auth/login')
const createTodo = require('./src/todos/createTodo')
const getTodo = require('./src/todos/getTodo')
const removeTodo = require('./src/todos/removeTodo')
const updateTodo = require('./src/todos/updateTodo')
const schemaCreation = require('./src/utils/schema')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json
require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', register)

app.post('/login', login)

app.get('/todos', getTodo)

app.post('/todo', createTodo)

app.delete('/todo/:id', removeTodo)

app.put('/todo/:id', updateTodo)

app.listen(port, () => {
  schemaCreation()
  console.log(`App listening on port ${port}`)
})
