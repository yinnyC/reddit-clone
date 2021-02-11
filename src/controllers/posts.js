const Post = require('../models/post');
exports.newPostForm = (req, res, next) => {
  return res.render('posts/posts-new')
}

exports.newPost = (req, res, next) => {
  const post = new Post(req.body)
  // SAVE INSTANCE OF POST MODEL TO DB
  post.save()
    .then(result => {
      return res.redirect('/')
    })
    .catch(err => {
      throw err.message
    })
}