const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const userRoutes = require('./routes/userRoutes')
const collabRoutes = require('./routes/collabRoutes')
const hackathonRoutes = require('./routes/hackathonRoutes')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

// Store online users
const onlineUsers = {}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // User joins with their userId
  socket.on('join', (userId) => {
    onlineUsers[userId] = socket.id
    console.log(`User ${userId} joined`)
  })

  // Disconnect
  socket.on('disconnect', () => {
    // Remove from online users
    Object.keys(onlineUsers).forEach(key => {
      if (onlineUsers[key] === socket.id) {
        delete onlineUsers[key]
      }
    })
    console.log('User disconnected:', socket.id)
  })
})

// Make io accessible in routes
app.set('io', io)
app.set('onlineUsers', onlineUsers)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)
app.use('/api/collab', collabRoutes)
app.use('/api/hackathons', hackathonRoutes)

app.get('/', (req, res) => {
  res.send('DevCircle backend running! 🚀')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    server.listen(5000, () => console.log('Server running on port 5000 ✅'))
  })
  .catch((err) => console.log(err))