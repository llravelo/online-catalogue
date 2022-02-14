const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  bookList: {
    type: [String],
    default: []
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = InvoiceSchema
