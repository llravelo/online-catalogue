const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  bookId: {
    type: Schema.Types.ObjectId
  },
  review: {
    type: String,
    default: ''
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = ReviewSchema
