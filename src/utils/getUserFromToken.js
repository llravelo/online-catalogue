const jwt = require('jsonwebtoken')

function getUserFromToken (accessToken) {
  if (!accessToken) return ''

  const { user } = jwt.verify(accessToken, process.env.JWT_SECRET)
  return '' || user
}

module.exports = getUserFromToken
