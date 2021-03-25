const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.header('AUTH-TOKEN')

  if (!token) return res.status(401).send({ error: 'Access Denied!' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = verified
    next()
  } catch (err) {
    res.status(401).send({ error: 'Invalid Token!' })
  }
}

module.exports = verifyToken
