const { getReviews, addReview } = require('../controllers/reviewController')
const verifyToken = require('../middlewares/verifyToken')

const routes = (app) => {
  app.route('/review')
    .get(getReviews)
    .post(verifyToken, addReview)
}

module.exports = routes
