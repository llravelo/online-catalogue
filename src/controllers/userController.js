const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserSchema = require('../models/userModel')

const User = mongoose.model('User', UserSchema)

const signupUser = async (req, res) => {
  try {
    const { password } = req.body
    const salt = await bcrypt.genSalt()
    let hashedPassword

    if (password) { hashedPassword = await bcrypt.hash(password, salt) }

    const newUser = new User({ ...req.body, password: hashedPassword })
    newUser.save((err, user) => {
      if (err) res.send(err)
      res
        .status(201)
        .json(user)
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err })
  }
}

const signinUser = async (req, res) => {
  try {
    const { user: userId, password } = req.body
    if (!userId || !password) return res.status(500).json({ message: 'missing username or password' })

    const user = await User.find({ user: userId })
    if (user.length < 1) {
      res
        .status(403)
        .json({ message: 'Invalid username or password' })
    }
    if (await bcrypt.compare(password, user[0].password)) {
      const jwtUser = { user: user[0].user }
      const accessToken = jwt.sign(jwtUser, process.env.JWT_SECRET)
      res
        .status(200)
        .json(({ accessToken: accessToken }))
    } else {
      res
        .status(403)
        .json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err })
  }
}

const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.send(err)
    res
      .status(200)
      .json(user)
  })
}

const findUserByID = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) res.send(err)
    res
      .status(200)
      .json(user)
  })
}

module.exports = {
  signupUser,
  signinUser,
  getUsers,
  findUserByID
}
