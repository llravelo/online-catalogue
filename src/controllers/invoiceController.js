const mongoose = require('mongoose')
const InvoiceSchema = require('../models/invoiceModel')
const getUserFromToken = require('../utils/getUserFromToken')
const { User } = require('./userController')

const Invoice = mongoose.model('Invoice', InvoiceSchema)

const getInvoices = async (req, res) => {
  const { authorization: header } = req.headers
  const token = header && header.split(' ')[1]
  const userId = getUserFromToken(token)

  const user = await User.find({ user: userId })
  if (user.length < 1) return res.status(404).json({ message: 'user not found' })

  const id = user[0]._id
  Invoice.find({ userId: id }, (err, invoices) => {
    if (err) return res.send(err)
    res
      .status(200)
      .json(invoices)
  })
}

const addInvoice = async (req, res) => {
  const { authorization: header } = req.headers
  const { bookList } = req.body

  const token = header && header.split(' ')[1]
  const userId = getUserFromToken(token)

  const user = await User.find({ user: userId })
  if (user.length < 1) return res.status(404).json({ message: 'user not found' })

  const id = user[0]._id
  const invoiceObject = {
    userId: id,
    bookList: bookList
  }

  const newInvoice = new Invoice(invoiceObject)
  newInvoice.save((err, invoice) => {
    if (err) return res.send(err)
    res
      .status(201)
      .json(invoice)
  })
}

module.exports = {
  getInvoices,
  addInvoice
}
