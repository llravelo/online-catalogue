const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  user: {
    type: String,
    required: 'Enter username'
  },
  password: {
    type: String,
    required: 'Enter password'
  },
  fullName: {
    type: String,
    required: 'Enter full name'
  },
  email: {
    type: String,
    required: 'Enter email'
  },
  phone: {
    type: Number
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = UserSchema
