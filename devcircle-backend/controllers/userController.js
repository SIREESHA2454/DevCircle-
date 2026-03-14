const User = require('../models/User')
const Project = require('../models/Project')

// GET user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // get their projects too
    const projects = await Project.find({ postedBy: req.params.id })
      .sort({ createdAt: -1 })

    res.status(200).json({ user, projects })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// UPDATE user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, skills, branch, year } = req.body

    const skillsArray = skills
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const updatedUser = await User.findByIdAndUpdate(
  req.userId,
  { name, bio, branch, year, skills: skillsArray },
  { new: true, returnDocument: 'after' }
).select('-password')

    res.status(200).json({
      message: 'Profile updated!',
      user: updatedUser
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// SEARCH users
const searchUsers = async (req, res) => {
  try {
    const { skill, branch, year } = req.query

    let filter = {}

    if (skill) {
      filter.skills = { $regex: skill, $options: 'i' }
    }
    if (branch) {
      filter.branch = { $regex: branch, $options: 'i' }
    }
    if (year) {
      filter.year = year
    }

    const users = await User.find(filter)
      .select('-password')
      .limit(20)

    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// CONNECT with a user
const connectUser = async (req, res) => {
  try {
    const targetUserId = req.params.id
    const currentUserId = req.userId

    // can't connect with yourself
    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You can't connect with yourself!" })
    }

    const currentUser = await User.findById(currentUserId)
    const targetUser = await User.findById(targetUserId)

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // check if already connected
    if (currentUser.connections.includes(targetUserId)) {
      // disconnect
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { connections: targetUserId }
      })
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { connections: currentUserId }
      })
      return res.status(200).json({ message: 'Disconnected', connected: false })
    }

    // connect
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { connections: targetUserId }
    })
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { connections: currentUserId }
    })

    res.status(200).json({ message: 'Connected!', connected: true })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getUserProfile, updateUserProfile, searchUsers, connectUser }