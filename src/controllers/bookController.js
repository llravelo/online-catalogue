const mongoose = require('mongoose')
const BookSchema = require('../models/bookModel')

const Book = mongoose.model('Book', BookSchema)

const getBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if (err) return res.send(err)
    res
      .status(200)
      .json(books)
  })
}

const findBookByID = (req, res) => {
  Book.findById(req.params.bookID, (err, book) => {
    if (err) return res.send(err)
    res
      .status(200)
      .json(book)
  })
}

const addBook = async (req, res) => {
  const { title, author } = req.body

  const existingBook = await Book.find({ title: title, author: author })
  if (existingBook.length >= 1) return res.status(403).json({ message: 'Book Already exists' })

  const newBook = new Book(req.body)
  newBook.save((err, book) => {
    if (err) return res.send(err)
    res
      .status(201)
      .json(book)
  })
}

module.exports = {
  getBooks,
  findBookByID,
  addBook,
  Book
}
