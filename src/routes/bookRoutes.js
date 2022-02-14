const { getBooks, addBook, findBookByID } = require('../controllers/bookController')
const verifyToken = require('../middlewares/verifyToken')

const routes = (app) => {
  app.route('/books')
    .get(getBooks)
    .post(verifyToken, addBook)

  app.route('/books/:bookID')
    .get(findBookByID)
}

module.exports = routes
