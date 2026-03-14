const CollabRequest = require('../models/CollabRequest')
const Project = require('../models/Project')

// SEND collab request
const sendCollabRequest = async (req, res) => {
  try {
    const { projectId, message } = req.body
    const fromUserId = req.userId

    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const toUserId = project.postedBy

    // can't request your own project
    if (fromUserId === toUserId.toString()) {
      return res.status(400).json({ message: "Can't request your own project!" })
    }

    // check if already requested
    const existing = await CollabRequest.findOne({
      from: fromUserId,
      project: projectId,
      status: 'pending'
    })

    if (existing) {
      return res.status(400).json({ message: 'Request already sent!' })
    }

    const request = await CollabRequest.create({
      from: fromUserId,
      to: toUserId,
      project: projectId,
      message
    })

    await request.populate('from', 'name email branch year')
    await request.populate('project', 'title')

    // Send real-time notification
const io = req.app.get('io')
const onlineUsers = req.app.get('onlineUsers')
const receiverSocketId = onlineUsers[toUserId.toString()]

if (receiverSocketId) {
  io.to(receiverSocketId).emit('notification', {
    type: 'collab_request',
    message: `Someone wants to collaborate on your project!`,
    projectId: projectId
  })
}

    res.status(201).json({ message: 'Collab request sent!', request })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET my received requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await CollabRequest.find({ to: req.userId })
      .populate('from', 'name email branch year skills')
      .populate('project', 'title description')
      .sort({ createdAt: -1 })

    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET my sent requests
const getMySentRequests = async (req, res) => {
  try {
    const requests = await CollabRequest.find({ from: req.userId })
      .populate('to', 'name email branch year')
      .populate('project', 'title description')
      .sort({ createdAt: -1 })

    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// RESPOND to request (accept/reject)
const respondToRequest = async (req, res) => {
  try {
    const { status } = req.body // 'accepted' or 'rejected'
    const requestId = req.params.id

    const request = await CollabRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }

    // only receiver can respond
    if (request.to.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    request.status = status
    await request.save()

    // if accepted, add to project collaborators
    if (status === 'accepted') {
      await Project.findByIdAndUpdate(request.project, {
        $addToSet: { collaborators: request.from }
      })
    }

    res.status(200).json({ message: `Request ${status}!`, request })

    // Send real-time notification to the person who sent the request
const io = req.app.get('io')
const onlineUsers = req.app.get('onlineUsers')
const senderSocketId = onlineUsers[request.from.toString()]

if (senderSocketId) {
  io.to(senderSocketId).emit('notification', {
    type: status === 'accepted' ? 'collab_accepted' : 'collab_rejected',
    message: status === 'accepted'
      ? '🎉 Your collaboration request was accepted!'
      : '😔 Your collaboration request was rejected.'
  })
}

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { sendCollabRequest, getMyRequests, getMySentRequests, respondToRequest }