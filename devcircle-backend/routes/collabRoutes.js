const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { sendCollabRequest, getMyRequests, getMySentRequests, respondToRequest } = require('../controllers/collabController')

router.post('/send', authMiddleware, sendCollabRequest)
router.get('/received', authMiddleware, getMyRequests)
router.get('/sent', authMiddleware, getMySentRequests)
router.put('/respond/:id', authMiddleware, respondToRequest)

module.exports = router