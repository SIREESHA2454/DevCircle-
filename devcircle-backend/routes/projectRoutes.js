const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  getAllProjects,
  createProject,
  getProjectById,
  deleteProject
} = require('../controllers/projectController')

// Public routes
router.get('/', getAllProjects)
router.get('/:id', getProjectById)

// Protected routes (need to be logged in)
router.post('/', authMiddleware, createProject)
router.delete('/:id', authMiddleware, deleteProject)

module.exports = router