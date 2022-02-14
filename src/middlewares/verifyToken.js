const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function verifyToken (req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.sendStatus(401)
  const token = header.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = verifyToken
