const Post = require('../models/post')

exports.index = (req, res, next) => {
  Post.find().lean()
   .then(posts => {
     return res.render('posts/posts-index', { posts } )
   })
   .catch(err => {
     throw err.message
   })
}