const mongoose = require('mongoose')
const ReviewSchema = require('../models/reviewModel')
const getUserFromToken = require('../utils/getUserFromToken')
const { User } = require('./userController')
const { Book } = require('./bookController')

const Review = mongoose.model('Review', ReviewSchema)

const getReviews = (req, res) => {
  Review.find({}, (err, reviews) => {
    if (err) return res.send(err)
    res
      .status(200)
      .json(reviews)
  })
}

const addReview = async (req, res) => {
  try {
    const { authorization: header } = req.headers
    const { bookId, review } = req.body

    const token = header && header.split(' ')[1]
    const userId = getUserFromToken(token)

    const user = await User.find({ user: userId })
    const book = await Book.findById(bookId)
    if (user.length < 1) return res.status(404).json({ message: 'user not found' })

    const userObjectId = user[0]._id
    const bookObjectId = book._id

    const reviewObject = {
      userId: userObjectId,
      bookId: bookObjectId,
      review: review
    }

    const newReview = new Review(reviewObject)
    newReview.save((err, review) => {
      if (err) return res.send(err)
      res
        .status(201)
        .json(review)
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err })
  }
}

module.exports = {
  getReviews,
  addReview
}
