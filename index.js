require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')

const {
  SERVER_PORT,
  MONGO_URL,
  MONGO_PORT,
  MONGO_DB_NAME
} = process.env

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection
  .once('open', () => console.log('Connected to mongodb database'))
  .on('error', (error) => console.log(`Error: ${error}`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})
