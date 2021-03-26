const router = require('express').Router()
const verifyToken = require('./verify-token')
const Blog = require('../model/blog')
const { blogSchema } = require('../validations/validation')

// Create a blog
router.post('/create', verifyToken, async (req, res) => {
  // Validate request Schema
  const { error } = blogSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    userId: req.user._id,
  })

  try {
    const savedBlog = await blog.save()
    return res.json({ id: savedBlog._id })
  } catch (err) {
    res.status(400).json(err)
  }
})

// Get All blogs
router.get('/all', verifyToken, async (req, res) => {
  const userId = req.user._id
  const blogs = await Blog.find({ userId })
  if (!blogs) return res.status(201).json([])

  return res.json(blogs)
})

// Get blog by id
router.get('/:id', verifyToken, async (req, res) => {
  const blogId = req.params.id
  let blog
  try {
    blog = await Blog.findOne({ _id: blogId })
  } catch (err) {
    return res.status(400).json({ error: 'No blog found!' })
  }
  if (!blog) return res.status(201).json({})

  return res.json(blog)
})

// Delete blog
router.delete('/:id', verifyToken, async (req, res) => {
  const blogId = req.params.id
  let blog
  try {
    blog = await Blog.deleteOne({ _id: blogId })
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ error: 'No blog found!' })
  }
})

module.exports = router
