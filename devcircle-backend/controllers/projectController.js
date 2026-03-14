const Project = require('../models/Project')

// GET all projects (feed)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('postedBy', 'name email branch year skills avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// POST create a project
const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveLink, techStack } = req.body

    const techStackArray = techStack
      ? techStack.split(',').map(t => t.trim()).filter(Boolean)
      : []

    const project = await Project.create({
      title,
      description,
      githubLink,
      liveLink,
      techStack: techStackArray,
      image: req.file ? req.file.path : '',
      postedBy: req.userId
    })

    const populatedProject = await project.populate('postedBy', 'name email branch year avatar')

    res.status(201).json({
      message: 'Project created successfully!',
      project: populatedProject
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET single project
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('postedBy', 'name email branch year skills avatar')

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// DELETE a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    // only owner can delete
    if (project.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await project.deleteOne()
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getAllProjects, createProject, getProjectById, deleteProject }