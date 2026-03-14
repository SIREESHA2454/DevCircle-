const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  branch: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)