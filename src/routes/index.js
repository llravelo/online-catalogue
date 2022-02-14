const userRoutes = require('./userRoutes')

const routes = (app) => {
  userRoutes(app)
}

module.exports = routes
