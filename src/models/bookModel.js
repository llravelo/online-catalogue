const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: 'Enter title'
  },
  author: {
    type: String,
    required: 'Enter author'
  },
  description: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = BookSchema
