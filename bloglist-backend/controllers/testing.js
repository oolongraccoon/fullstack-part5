const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  const blogs = await Blog.find({})
  console.log(blogs)
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router