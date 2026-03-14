const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getAllHackathons, createHackathon, toggleInterest } = require('../controllers/hackathonController')

router.get('/', getAllHackathons)
router.post('/', authMiddleware, createHackathon)
router.put('/:id/interest', authMiddleware, toggleInterest)

module.exports = router