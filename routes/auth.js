const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { registrationSchema, loginSchema } = require('../validations/validation')

// Login
router.post('/login', async (req, res) => {
  // Fields validation
  let user
  const { error } = loginSchema.validate(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })

  //Check Login
  try {
    user = await User.findOne({ email: req.body.email })
  } catch (err) {
    return res.status(400).json({ error: err })
  }

  if (!user) return res.status(401).send({ error: 'Email not found!' })

  const validPassword = bcrypt.compareSync(req.body.password, user.password)

  if (!validPassword) return res.status(401).send({ error: 'Password is wrong' })

  // Create and assign a jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { algorithm: 'HS512', expiresIn: '24h' })
  return res.header('AUTH-TOKEN', token).send({ message: `Hi! ${user.name}. Your token is ${token}` })
})

// Registration
router.post('/register', async (req, res) => {
  // Check if passwords match
  const passwordMismatch = req.body.password !== req.body.confirmPassword
  if (passwordMismatch) return res.status(400).send({ error: "Passwords don't match" })

  // Fields validation
  const { error } = registrationSchema.validate(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })

  // Check existing email
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send({ message: 'Email is already registered' })

  // HASH THE PASSWORD
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await user.save()
    res.send({ id: savedUser._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
