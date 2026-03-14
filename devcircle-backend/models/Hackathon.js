const mongoose = require('mongoose')

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Online'
  },
  prize: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  interested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

module.exports = mongoose.model('Hackathon', hackathonSchema)