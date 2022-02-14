const {
  signupUser,
  signinUser,
  signoutUser,
  token,
  validateEmail,
  getUsers,
  findUserByID
} = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')

const routes = (app) => {
  app.route('/signup')
    .post(signupUser)

  app.route('/signin')
    .post(signinUser)

  app.route('/signout')
    .delete(signoutUser)

  app.route('/token')
    .post(token)

  app.route('/validate/email/:email')
    .get(validateEmail)

  app.route('/user')
    .get(verifyToken, getUsers)

  app.route('/user/:userID')
    .get(verifyToken, findUserByID)
}

module.exports = routes
