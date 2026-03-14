const Hackathon = require('../models/Hackathon')

// GET all hackathons
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .sort({ createdAt: -1 })
    res.status(200).json(hackathons)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// POST create hackathon
const createHackathon = async (req, res) => {
  try {
    const { title, description, date, location, prize, link } = req.body

    const hackathon = await Hackathon.create({
      title, description, date, location, prize, link,
      postedBy: req.userId
    })

    res.status(201).json({ message: 'Hackathon created!', hackathon })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// TOGGLE interest in hackathon
const toggleInterest = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' })
    }

    const isInterested = hackathon.interested.includes(req.userId)

    if (isInterested) {
      await Hackathon.findByIdAndUpdate(req.params.id, {
        $pull: { interested: req.userId }
      })
    } else {
      await Hackathon.findByIdAndUpdate(req.params.id, {
        $addToSet: { interested: req.userId }
      })
    }

    res.status(200).json({
      message: isInterested ? 'Removed interest' : 'Marked as interested!',
      interested: !isInterested
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getAllHackathons, createHackathon, toggleInterest }