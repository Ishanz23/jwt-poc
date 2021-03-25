const router = require('express').Router()
const verifyToken = require('./verify-token')

router.get('/', verifyToken, (req, res) => {
  res.json({
    id: 1,
    user: req.user,
    heading: 'First Post',
    body: 'Test Post',
  })
})

module.exports = router
