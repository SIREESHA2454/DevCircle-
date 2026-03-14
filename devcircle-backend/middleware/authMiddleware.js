const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach userId to request
    req.userId = decoded.userId

    next() // move to next middleware/controller

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware