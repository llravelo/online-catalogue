const userRoutes = require('./userRoutes')
const bookRoutes = require('./bookRoutes')
const invoiceRoutes = require('./invoiceRoutes')
const reviewRoutes = require('./reviewRoutes')

const routes = (app) => {
  userRoutes(app)
  bookRoutes(app)
  invoiceRoutes(app)
  reviewRoutes(app)
}

module.exports = routes
