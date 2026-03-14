const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getUserProfile, updateUserProfile, searchUsers, connectUser } = require('../controllers/userController')


router.get('/search', authMiddleware, searchUsers)
router.put('/update', authMiddleware, updateUserProfile)
router.post('/connect/:id', authMiddleware, connectUser)
router.get('/:id', authMiddleware, getUserProfile)

module.exports = router