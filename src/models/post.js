const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
}, { timestamps: true })

module.exports = mongoose.model('Post', Post)
