const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  userId: String,
})

module.exports = mongoose.model('Blog', blogSchema)
